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

export function nuevoPaisForm() {
    let html = "<form action='/paises/nuevo' method='post' >"
    html += `
    <div>
        <label>Ciudad</label>
        <input type="text" name="city" />
    </div>
    <div>
        <label>Pais</label>
        <input type="text" name="country" />
    </div>
    <div>
        <label>Capital</label>
        <input type="text" name="capital" />
    </div> 
    <div>
        <label>Poblacion</label>
        <input type="text" name="population" />
    </div>       
    <div>
        <label>Lat:</label>
        <input type="text" name="lat" />
    </div>    
    <div>
        <label>Lon</label>
        <input type="text" name="lon" />
    </div>      
    <button type="submit" >Guardar</button>              
    `
    html += "</form>"
    html += "<a href='/paises' >Volver</a>"

    return createPage("Nueva ciudad", html)
}

export function editarPaisForm(ciudad) {
    let html = `<form action='/paises/editar/${ciudad.id}' method='post' >`
    html += `
    <div>
        <label>Ciudad</label>
        <input type="text" name="city" value="${ciudad.city}"/>
    </div>
    <div>
        <label>Pais</label>
        <input type="text" name="country" value="${ciudad.country}"/>
    </div>
    <div>
        <label>Capital</label>
        <input type="text" name="capital" value="${ciudad.capital}"/>
    </div> 
    <div>
        <label>Poblacion</label>
        <input type="text" name="population" value="${ciudad.population}"/>
    </div>       
    <div>
        <label>Lat:</label>
        <input type="text" name="lat" value="${ciudad.lat}"/>
    </div>    
    <div>
        <label>Lon</label>
        <input type="text" name="lon" value="${ciudad.lon}"/>
    </div>      
    <button type="submit" >Guardar</button>              
    `
    html += "</form>"
    html += "<a href='/paises' >Volver</a>"

    return createPage("Editar ciudad", html)
}

export function eliminarPaisForm(ciudad) {
    console.log(ciudad.id)
    let html = `<form action='/paises/eliminar/${ciudad.id}' method='post' >`
    html += `<p>Pais: ${ciudad.country}</p>`
    html += `<p>Capital: ${ciudad.capital}</p>`
    html += `<p>Poblacion: ${ciudad.population}</p>`
    html += `<p>Coordenadas: ${ciudad.lat} ,${ciudad.lon} </p>`
    html += `<button type="submit" >Eliminar</button>`
    html += "</form>"
    html += "<a href='/paises' >Volver</a>"

    return createPage(ciudad.city, html)
}