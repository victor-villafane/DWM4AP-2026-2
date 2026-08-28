// const http = require("http") //CommonJS
// const personajes = require("./data/personajes.js")
// const page = require("./page/utils.js")
import { createServer } from "http"
import personajes from "./data/personajes.js"
import page from "./page/utils.js"
import { createPage, createList } from "./page/utils.js"
import { readFile } from "fs/promises"

const server = createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.end(page.createPage("Bienvenido", "Victor Villafañe"))
            break
        case "/materia":
            response.end(page.createPage("Materia", "Aplicaciones hibridas"))
            break
        case "/alumnos":
            response.end(page.createPage("alumnos", page.createList(personajes)))
            break
        case "/pagina":
            readFile("./public/index.html", "utf8")
                .then(data => response.end(data))
                .catch(err => response.end(page.createPage("Pagina no encontrada", "404")))
            break
        case "/homer-simpson.jpg":
            readFile("./public/homer-simpson.jpg")
                .then(data => response.end(data))
                .catch(err => response.end(page.createPage("Pagina no encontrada", "404")))
            break
        case "/favicon.ico":
            readFile("./public/homer-simpson.jpg")
                .then(data => response.end(data))
                .catch(err => response.end(page.createPage("Pagina no encontrada", "404")))
            break
        case "/style.css":
            readFile("./public/style.css", "utf8")
                .then(data => response.end(data))
                .catch(err => response.end(page.createPage("Pagina no encontrada", "404")))
            break
        case "/profesor":
            response.end(page.createPage("Profesor", "1234"))
            break
        default:
            response.end(page.createPage("Pagina no encontrada", "404"))
            break
    }
})

server.listen(2026)