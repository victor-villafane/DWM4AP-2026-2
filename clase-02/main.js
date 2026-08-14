const http = require("http") //CommonJS

const personajes = [
    {
        id: 1,
        nombre: "Homero",
        nota: 7
    },
    {
        id: 2,
        nombre: "Marge",
        nota: 10
    },
    {
        id: 3,
        nombre: "Lisa",
        nota: 9
    },
    {
        id: 4,
        nombre: "Bart",
        nota: 5
    },
    {
        id: 5,
        nombre: "Maggie",
        nota: 8
    }
]

const server = http.createServer((request, response) => {
    console.log(request.url)
    response.write(`
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
    <body>`)
    response.write("<h1>Bienvenidos</h1>")
    switch (request.url) {
        case "/":
            response.write("Victor Villafañe")
            break
        case "/materia":
            response.write("Aplicaciones Hibridas")
            break
        case "/alumnos":
            response.write("<ul>")
            personajes.forEach(alumno => response.write(
                "<li>Nombre: " + alumno.nombre +" Nota:"+alumno.nota+ "</li>"
            ))
            response.write("</ul>")
            break
        case "/profesor":
            response.write("1234")
            break
        default:
            response.write("404")
            break
    }
    response.end("</body></html>")
})

server.listen(2026)