import { createList, createPage } from "../page/utils.js"

export function listadoPaises(paises) {
    return createPage("Listado de paises", createList(paises))
}

export function ciudadDetalle(ciudad) {
    let html = ""
    html += `<p>Pais: ${ciudad.country}</p>`
    html += `<p>Capital: ${ciudad.capital}</p>`
    html += `<p>Poblacion: ${ciudad.population}</p>`
    html += `<p>Coordenadas: ${ciudad.lat} ,${ciudad.lon} </p>`
    html += "<a href='/paises' >Volver</a>"

    return createPage(ciudad.city, html)
}