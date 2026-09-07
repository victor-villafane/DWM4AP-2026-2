import { readFile, writeFile } from "fs/promises"
import { ObjectId } from "mongodb"
import { MongoClient } from "mongodb"

const MONGO_URI="mongodb+srv://admin:admin@dwm4ap.lfosh7x.mongodb.net/?appName=dwm4ap"

const client = new MongoClient(MONGO_URI) //Nos conectamos al cluster
const db = client.db("dwm4ap")            //Nos conectamos a la DB

export async function getPaises() {
    const filter = { eliminado: { $ne: true } } // field: filtro -> eliminado != true
                                                    //https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    const ciudades = await db.collection("ciudades").find(filter).toArray()
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