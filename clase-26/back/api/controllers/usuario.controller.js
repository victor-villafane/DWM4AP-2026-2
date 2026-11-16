import * as usuarioService from "../../services/usuario.service.js"

export async function getUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.getUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los usuarios" })
    }
}

export async function saveUser(req, res) {
    try {
        const user = await usuarioService.saveUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el usuario" })
    }
}
export async function login(req, res) {
    try {
        const user = await usuarioService.login(req.body)
        if( !user ) return res.status(400).json({ message: "Usuario/Contraseña invalido" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el usuario" })
    }
}

export async function asignarRol(req, res){
    try {
        const user = await usuarioService.asignarRol(req.body)
        if( !user ) return res.status(400).json({ message: "No se pudo asignar rol" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "No se pudo asignar rol" })
    }
}

export async function reset(req, res){
    try {
        const user = await usuarioService.reset(req.body)
        if( !user ) return res.status(400).json({ message: "No se pudo reestablecer password" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "No se pudo reestablecer password" })
    }
}

export async function socialLogin(req, res){
    try {
        const user = await usuarioService.login(req.usuario, true)
        if( !user ) return res.status(400).json({ message: "Usuario/Contraseña invalido" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el usuario" })
    }
} 