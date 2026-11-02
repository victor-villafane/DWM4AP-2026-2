import { ObjectId } from "mongodb"
import { MongoClient } from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const MONGO_URI = "mongodb+srv://admin:admin@dwm4ap.lfosh7x.mongodb.net/?appName=dwm4ap"

const client = new MongoClient(MONGO_URI) //Nos conectamos al cluster
const db = client.db("dwm4ap")            //Nos conectamos a la DB

export async function getUsers() {
    const usuarios = await db.collection("usuarios").find().toArray()
    return usuarios
}

export async function saveUser(usuario) {
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error()

    usuario.password = await bcrypt.hash(usuario.password, 10)
    delete usuario.passwordConfirm

    const user = await db.collection("usuarios").insertOne(usuario)
    return user
}

export async function login(usuario) {
    const usuarioDB = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!usuarioDB) throw new Error("")

    const ok = await bcrypt.compare(usuario.password, usuarioDB.password)
    if (!ok) throw new Error("")

    const token = jwt.sign({
        email: usuarioDB.email,
        name: usuarioDB.name,
        username: usuarioDB.username,
        rol: usuarioDB.rol
    }, "Clave secreta", { expiresIn: "2h" })

    return {
        email: usuarioDB.email,
        name: usuarioDB.name,
        username: usuarioDB.username,
        rol: usuarioDB.rol,
        token: token
    }
}

export async function asignarRol(datos) {
    const usuario = datos.usuario
    const rolNuevo = datos.rol

    await db.collection("usuarios").updateOne(
        { email: usuario.email },
        { $set: { rol: rolNuevo } }
    )

    return usuario
}

export async function reset(usuario) {

    await db.collection("usuarios").updateOne(
        { email: usuario.email },
        { $set: { password: "$2b$10$F/z7dZsaGeH7LSqGu8VCTOkNlVG5VQ39hDPCXt6K0zp6qn15OrhQG" } }
    )

    return usuario
}