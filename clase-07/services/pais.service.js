import { readFile, writeFile } from "fs/promises"

export async function getPaises() {
    return JSON.parse(await readFile("./data/paises.json", "utf8")) //https://csvjson.com/csv2json
}

export async function getPaisesById(id) {
    const paises = await getPaises() //https://csvjson.com/csv2json
    const ciudad = paises.find(p => p.id == id)
    return ciudad
}

export async function guardarPais(pais) {
    const paises = await getPaises() //https://csvjson.com/csv2json
    pais.id = paises.length + 1
    paises.push(pais)
    await writeFile("./data/paises.json", JSON.stringify(paises), "utf8")
    return pais
}

export async function editarPais(pais, id) {
    console.log(pais)
    const paises = await getPaises() //https://csvjson.com/csv2json
    const paisesGuardados = paises.map( p => {
        if( p.id == id ){
            console.log("Cambiado")
            pais.id = id
            return pais
        }else{
            return p
        }
    } )
    await writeFile("./data/paises.json", JSON.stringify(paisesGuardados), "utf8")
    console.log(pais)
    return pais
}

export async function eliminarPais(id){
    const paises = await getPaises() //https://csvjson.com/csv2json
    let pais = {}
    const paisesGuardar = paises.filter( p => {
        if( p.id != id ) return true
        else {
            pais = p
            return false
        }
    } )
    await writeFile("./data/paises.json", JSON.stringify(paisesGuardar), "utf8")
    return pais
}