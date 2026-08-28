export function createPage(title, content){
    let html = ""
    html += `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">`
    html += `<title>${title}</title></head><body>`
    html += `<h1>${title}</h1>`
    html += content
    html += "</body></html>"
    return html
}

export function createList(lista){
    let html = ""
    html += "<ul>"
    lista.forEach( 
        (item) => html += "<li>Pais: " + item.country + " Ciudad:" + item.city+ `<a href='/paises/${item.id}'>Ver</a>` + "</li>" 
    )
    html += "</ul>"
    return html
}

// module.exports = { createPage, createList }
export default { createPage, createList }