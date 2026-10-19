import * as usuarioService from "../../services/usuario.service.js"

export async function getUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.getUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los usuarios" })
    }
}

// export async function getPaisById(req, res) {
//     try {
//         const id = req.params.id
//         const pais = await paisService.getPaisesById(id)
//         if (pais) res.status(200).json(pais)
//         else res.status(404).json({ message: "Ciudad no encontrada" })
//     } catch (error) {
//         res.json({ message: "Error al obtener el pais" })
//     }
// }

// export async function savePais(req, res) {
//     try {
//         const pais = await paisService.guardarPais(req.body)
//         res.status(201).json(pais)
//     } catch (error) {
//         res.status(500).json({ message: "Error al agregar el pais" })
//     }
// }

// export async function deletePais(req, res) {
//     try {
//         const id = req.params.id
//         const pais = await paisService.eliminarPais(id)
//         if (pais) res.status(202).json(pais)
//         else res.status(404).json({ message: "Ciudad no encontrada" })
//     } catch (error) {
//         res.status(500).json({ message: "Error al eliminar el pais" })
//     }
// }

// export async function replacePais(req, res) {
//     try {
//         const id = req.params.id
//         const pais = await paisService.reemplazarPais(req.body, id)
//         if (pais) res.status(202).json(pais)
//         else res.status(404).json({ message: "Ciudad no encontrada" })
//     } catch (error) {
//         res.status(500).json({ message: "Error al reemplazar el pais" })
//     }
// }

// export async function updatePais(req, res) {
//     try {
//         const id = req.params.id
//         const pais = await paisService.actualizarPais(req.body, id)
//         if (pais) res.status(202).json(pais)
//         else res.status(404).json({ message: "Ciudad no encontrada" })
//     } catch (error) {
//         res.status(500).json({ message: "Error al reemplazar el pais" })
//     }
// }