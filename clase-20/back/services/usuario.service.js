import { ObjectId } from "mongodb"
import { MongoClient } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwm4ap.lfosh7x.mongodb.net/?appName=dwm4ap"

const client = new MongoClient(MONGO_URI) //Nos conectamos al cluster
const db = client.db("dwm4ap")            //Nos conectamos a la DB

export async function getUsers() {
    const usuarios = await db.collection("usuarios").find().toArray()
    return usuarios
}

export async function saveUser(usuario) {
    const user = await db.collection("usuarios").insertOne(usuario)
    return user
}

export async function login(usuario) {
    const usuarioDB = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!usuarioDB) throw new Error("")
    if (usuarioDB.password != usuario.password) throw new Error("")
    return {
        email: usuarioDB.email,
        name: usuarioDB.name,
        username: usuarioDB.username,
        rol: usuarioDB.rol
    }
}