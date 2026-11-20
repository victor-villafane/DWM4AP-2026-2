import express from "express"
import paisesRoute from "./routes/pais.routes.js"
import paisesApiRoute from "./api/routes/pais.routes.js"
import usuariosApiRoute from "./api/routes/usuario.routes.js"
import cors from "cors"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { z } from "zod"
import {
    getPaises,
    getPaisesById,
    guardarPais,
    reemplazarPais,
    actualizarPais,
    eliminarPais,
    savePaisFavorito,
    deletePaisFavorito
} from "./services/pais.service.js"

const app = express()

app.use(cors())
app.use( "/", express.static("public") )
app.use( "/uploads", express.static("uploads") )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

app.use( paisesRoute )
app.use( paisesApiRoute )
app.use( usuariosApiRoute )

app.post("/mcp", async (req, res) => {    // Este endpoint es para que el modelo conozca nuestras herramientas y pueda interactuar con ellas
    // Aquí se define el servidor MCP y se registran las herramientas que queremos exponer al modelo
    const server = new McpServer({
        name: "mcp-ciudades",           //Esto es obligatorio para que funcione
        description: "Servidor de ciudades",
        version: "1.0.0",   //Esto es obligatorio para que funcione
    })
    // Helper para responder con texto JSON o con error
    const responder = (dato) => ({
        content: [{ type: "text", text: JSON.stringify(dato) }]
    })
    const errorRespuesta = (mensaje) => ({
        isError: true,
        content: [{ type: "text", text: mensaje }]
    })

    const idCiudad = z.string().length(24).describe("_id de la ciudad (24 caracteres hexadecimales)")
    const camposCiudad = {
        city: z.string().min(3).describe("Nombre de la ciudad (mínimo 3 caracteres)"),
        country: z.string().min(3).describe("País (mínimo 3 caracteres)"),
        capital: z.string().min(3).describe("Capital (mínimo 3 caracteres)"),
        population: z.number().positive().describe("Población (mayor que 0)"),
        lat: z.number().describe("Latitud"),
        lon: z.number().describe("Longitud")
    }
    const camposCiudadOpcionales = Object.fromEntries(
        Object.entries(camposCiudad).map(([campo, schema]) => [campo, schema.optional()])
    )

    // Aquí se registran las herramientas que queremos exponer al modelo
    server.registerTool(
        "obtener_ciudades", {
        description: "Obtiene la lista de ciudades, con filtros opcionales y paginación",
        inputSchema: {
            page: z.number().int().min(1).optional().describe("Número de página (por defecto 1)"),
            limit: z.number().int().min(1).optional().describe("Ciudades por página (por defecto 10)"),
            pais: z.string().optional().describe("Filtra por país exacto"),
            ciudad: z.string().optional().describe("Busca ciudades por nombre"),
            poblacion_min: z.number().min(0).optional().describe("Población mínima"),
            poblacion_max: z.number().min(0).optional().describe("Población máxima")
        }
    },
        async (filtros) => {
            try {
                return responder(await getPaises(filtros))
            } catch (error) {
                return errorRespuesta("Error al obtener las ciudades")
            }
        }
    )

    server.registerTool(
        "obtener_ciudad_por_id", {
        description: "Obtiene una ciudad por su _id",
        inputSchema: {
            ciudad_id: z.string().length(24).describe("_id de la ciudad (24 caracteres hexadecimales)")
        }
    },
        async ({ ciudad_id }) => {
            try {
                const ciudad = await getPaisesById(ciudad_id)
                if (!ciudad) return errorRespuesta("Ciudad no encontrada")
                return responder(ciudad)
            } catch (error) {
                return errorRespuesta("Error al obtener la ciudad")
            }
        }
    )

    server.registerTool(
        "crear_ciudad", {
        description: "Crea una ciudad nueva",
        inputSchema: camposCiudad
    },
        async (ciudad) => {
            try {
                return responder(await guardarPais(ciudad))
            } catch (error) {
                return errorRespuesta("Error al crear la ciudad")
            }
        }
    )

    server.registerTool(
        "reemplazar_ciudad", {
        description: "Reemplaza por completo una ciudad existente (todos los campos son obligatorios)",
        inputSchema: { ciudad_id: idCiudad, ...camposCiudad }
    },
        async ({ ciudad_id, ...datos }) => {
            try {
                return responder(await reemplazarPais(datos, ciudad_id))
            } catch (error) {
                return errorRespuesta("Error al reemplazar la ciudad")
            }
        }
    )

    server.registerTool(
        "actualizar_ciudad", {
        description: "Actualiza parcialmente una ciudad existente (solo los campos que se envíen)",
        inputSchema: { ciudad_id: idCiudad, ...camposCiudadOpcionales }
    },
        async ({ ciudad_id, ...cambios }) => {
            try {
                return responder(await actualizarPais(cambios, ciudad_id))
            } catch (error) {
                return errorRespuesta("Error al actualizar la ciudad")
            }
        }
    )

    server.registerTool(
        "eliminar_ciudad", {
        description: "Elimina una ciudad de forma lógica (no se borra de la base de datos)",
        inputSchema: { ciudad_id: idCiudad }
    },
        async ({ ciudad_id }) => {
            try {
                await eliminarPais(ciudad_id)
                return responder({ _id: ciudad_id, eliminado: true })
            } catch (error) {
                return errorRespuesta("Error al eliminar la ciudad")
            }
        }
    )

    server.registerTool(
        "agregar_favorito", {
        description: "Agrega una ciudad a los favoritos de un usuario",
        inputSchema: {
            ciudad_id: idCiudad,
            usuario_id: z.string().length(24).describe("_id del usuario"),
            usuario_name: z.string().min(1).describe("Nombre del usuario")
        }
    },
        async ({ ciudad_id, usuario_id, usuario_name }) => {
            try {
                return responder(await savePaisFavorito(ciudad_id, { _id: usuario_id, name: usuario_name }))
            } catch (error) {
                return errorRespuesta("Error al agregar el favorito")
            }
        }
    )

    server.registerTool(
        "quitar_favorito", {
        description: "Quita una ciudad de los favoritos de un usuario",
        inputSchema: {
            ciudad_id: idCiudad,
            usuario_id: z.string().length(24).describe("_id del usuario"),
            usuario_name: z.string().min(1).describe("Nombre del usuario")
        }
    },
        async ({ ciudad_id, usuario_id, usuario_name }) => {
            try {
                return responder(await deletePaisFavorito(ciudad_id, { _id: usuario_id, name: usuario_name }))
            } catch (error) {
                return errorRespuesta("Error al quitar el favorito")
            }
        }
    )

    // Aqui se define el adaptador de transporte para que el servidor pueda comunicarse con el modelo a través de HTTP
    const transport = new StreamableHTTPServerTransport(
        { sessionIdGenerator: undefined }  // Esto es para que sea stateless
    )

    try {
        await server.connect(transport)                     // Esto es para que el servidor pueda recibir solicitudes del modelo
        await transport.handleRequest(req, res, req.body)   // Esto es para que el servidor pueda manejar la solicitud del modelo y enviar la respuesta
        res.on("close", () => {     // Esto es para cerrar la conexión cuando el cliente cierre la conexión
            transport.close()
            server.close()
        })
    } catch (error) {
        res.status(400).json({ error: "Error al procesar la solicitud" })
    }
})


app.delete("/mcp", (req, res) => {
    res.status(400).json({ error: "Método no permitido" })
})

app.listen(2026, () => console.log("Funcionando... http://localhost:2026"))