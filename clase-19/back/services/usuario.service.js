import { ObjectId } from "mongodb"
import { MongoClient } from "mongodb"

const MONGO_URI="mongodb+srv://admin:admin@dwm4ap.lfosh7x.mongodb.net/?appName=dwm4ap"

const client = new MongoClient(MONGO_URI) //Nos conectamos al cluster
const db = client.db("dwm4ap")            //Nos conectamos a la DB

export async function getUsers(){
    const usuarios = await db.collection("usuarios").find().toArray()
    return usuarios
}

