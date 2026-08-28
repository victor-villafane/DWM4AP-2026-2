import { readFile } from "fs/promises"

export async function getPaises() {
    return JSON.parse(await readFile("./data/paises.json", "utf8")) //https://csvjson.com/csv2json
}

export async function getPaisesById(id) {
    const paises = JSON.parse(await readFile("./data/paises.json", "utf8")) //https://csvjson.com/csv2json
    const ciudad = paises.find(p => p.id == id)
    return ciudad
}