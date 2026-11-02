export function createPage(title, content){
    let html = ""
    html += `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">`
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head><body>`
    html += `<h1>${title}</h1>`
    html += content
    html += `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body></html>`
    return html
}

export function createList(lista){
    let html = "<a href='/paises/nuevo' >Nueva ciudad</a>"
    html +=  "<a class='btn btn-primary m-1' href='/paises?pais=Argentina' >Argentina</a>"
    html +=  "<a class='btn btn-secondary m-1' href='/paises?pais=Uruguay' >Uruguay</a>"
    html +=  "<a class='btn btn-secondary m-1' href='/paises?pais=Chile' >Chile</a>"
    html +=  "<a class='btn btn-secondary m-1' href='/paises?pais=Brazil' >Brazil</a>"
    html +=  "<a class='btn btn-secondary m-1' href='/paises?pais=Bolivia' >Bolivia</a>"
    html += `
    <table class="mt-3 table table-striped" >
        <thead>
            <tr>
                <th>#</th>
                <th>Pais</th>
                <th>Ciudad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>`
        lista.forEach( item => html+= `
            <tr>
                <td>${item.id}</td>
                <td>${item.country}</td>
                <td>${item.city}</td>
                <td>
                    <a class="btn btn-primary" href='/paises/${item._id}'>Ver</a> 
                    <a class="btn btn-warning" href='/paises/editar/${item._id}'>Editar</a>
                    <a class="btn btn-danger" href='/paises/eliminar/${item._id}'>Eliminar</a>
                </td>
            </tr>
        ` )
    html +=    `</tbody>
    </table>
    `
    return html
}

// module.exports = { createPage, createList }
export default { createPage, createList }