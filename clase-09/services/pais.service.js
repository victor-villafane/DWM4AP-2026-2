import { readFile, writeFile } from "fs/promises"
import { ObjectId } from "mongodb"
import { MongoClient } from "mongodb"

const MONGO_URI="mongodb+srv://admin:admin@dwm4ap.lfosh7x.mongodb.net/?appName=dwm4ap"

const client = new MongoClient(MONGO_URI) //Nos conectamos al cluster
const db = client.db("dwm4ap")            //Nos conectamos a la DB

export async function getPaises(filtros = {}) {
    const filter = { eliminado: { $ne: true } } // field: filtro -> eliminado != true
                                                    //https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    // Calculo paginas
    const page = parseInt(filtros?.page || 1)
    const limit = parseInt(filtros?.limit || 10)
    const skip = (page - 1) * limit

    // Filtro por pais
    if(filtros.pais) filter.country = filtros.pais //$eq https://www.mongodb.com/es/docs/manual/reference/operator/query/eq/

    // Filtro por poblacion
    if( filtros.poblacion_min ) filter.population = 
                                { $gte: parseInt(filtros.poblacion_min) } //https://www.mongodb.com/es/docs/manual/reference/operator/query/gte/
    if( filtros.poblacion_max ) filter.population = 
                                { $lte: parseInt(filtros.poblacion_max) } //https://www.mongodb.com/es/docs/manual/reference/operator/query/lte/
    if( filtros.poblacion_min && filtros.poblacion_max )
        filter.$and = [
            { population: { $gte: parseInt(filtros.poblacion_min) } },
            { population: { $lte: parseInt(filtros.poblacion_max) } }
        ]
    // Ordenar por poblacion
    // 1 asc
    //-1 desc
    const sortBy = filtros.sort_by || "population"
    const sortOrder = filtros.sort_order == "asc" ? 1 : -1
    const sortOptions = { [sortBy]: sortOrder }
    // Busqueda por nombre
    // if( filtros.ciudad ) filter.$text = { $search: filtros.ciudad }
    if(filtros.ciudad) filter.city = { $regex: filtros.ciudad, $options: 'i' } //https://www.mongodb.com/es/docs/manual/reference/operator/query/regex/

    const ciudades = await db.collection("ciudades")
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray()
    return ciudades
}

export async function getPaisesById(id) {
    const ciudad = await db.collection("ciudades").findOne( {_id: new ObjectId(id)} )
    return ciudad
}

export async function guardarPais(ciudad) {
    await db.collection("ciudades").insertOne(ciudad)
    return ciudad
}

export async function reemplazarPais(pais, id) {
    await db.collection("ciudades").replaceOne(
        {_id: new ObjectId(id)},
        pais
    )
    return pais
}

export async function actualizarPais(pais, id) {
    await db.collection("ciudades").updateOne(
        {_id: new ObjectId(id)},
        { $set: pais } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return pais
}

export async function eliminarPais(id){
    const ciudad = getPaisesById(id)
    // await db.collection("ciudades").deleteOne({_id: new ObjectId(id)}) Borrado fisico
    await db.collection("ciudades").updateOne(
        {_id: new ObjectId(id)},
        { $set: { eliminado: true } }
    )
    return ciudad
}