import * as paisService from "../services/pais.service.js"
import * as paisView from "../views/pais.view.js"

export async function getPaises(req, res) {
    try {
        const paises = await paisService.getPaises()
        res.send(paisView.listadoPaises(paises))
    } catch (error) {
        res.send(error)
    }
}

export async function getPaisesById(req, res) {
    try {
        const id = req.params.id
        const ciudad = await paisService.getPaisesById(id)
        res.send(paisView.ciudadDetalle(ciudad))
    } catch (error) {
        res.send(error)
    }
}

export function nuevoPaisForm(req, res) {
    try {
        res.send(paisView.nuevoPaisForm())
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export async function guardarPais(req, res) {
    try {
        const pais = await paisService.guardarPais(req.body)
        res.send(paisView.ciudadDetalle(pais))
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export async function editarPaisForm(req, res) {
    try {
        const id = req.params.id
        const ciudad = await paisService.getPaisesById(id)
        res.send(paisView.editarPaisForm(ciudad))
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export async function editarPais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisService.reemplazarPais(req.body, id)
        res.send(paisView.ciudadDetalle(pais))
    } catch (error) {
        res.send(error)
    }
}

export async function eliminarPaisForm(req, res) {
    try {
        const id = req.params.id
        const ciudad = await paisService.getPaisesById(id)
        res.send(paisView.eliminarPaisForm(ciudad))
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export async function eliminarPais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisService.eliminarPais(id)
        res.send(paisView.ciudadDetalle(pais))
    } catch (error) {
        res.send(error)
    }
}