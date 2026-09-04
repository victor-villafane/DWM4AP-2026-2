import * as paisService from "../../services/pais.service.js"

export async function getPais(req, res) {
    try {
        const paises = await paisService.getPaises()
        res.status(200).json(paises)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los paises" })
    }
}

export async function getPaisById(req, res) {
    try {
        const id = req.params.id
        const pais = await paisService.getPaisesById(id)
        if (pais) res.status(200).json(pais)
        else res.status(404).json({ message: "Ciudad no encontrada" })
    } catch (error) {
        res.json({ message: "Error al obtener el pais" })
    }
}

export async function savePais(req, res) {
    try {
        const pais = await paisService.guardarPais(req.body)
        res.status(201).json(pais)
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el pais" })
    }
}

export async function deletePais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisService.eliminarPais(id)
        if (pais) res.status(202).json(pais)
        else res.status(404).json({ message: "Ciudad no encontrada" })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el pais" })
    }
}

export async function replacePais(req, res) {
    try {
        const id = req.params.id
        const pais = await paisService.editarPais(req.body, id)
        if (pais) res.status(202).json(pais)
        else res.status(404).json({ message: "Ciudad no encontrada" })
    } catch (error) {
        res.status(500).json({ message: "Error al reemplazar el pais" })
    }
}

export async function updatePais(req, res) {
    try {
        const id = req.params.id
        const paisActual = await paisService?.getPaisesById(id)
        //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
        req.body = {
            "city": req.body.city ?? paisActual.city, 
            "country": req.body.country ?? paisActual.country,
            "capital": req.body.capital ?? paisActual.capital,
            "population": req.body.population ?? paisActual.population,
            "lat": req.body.lat ?? paisActual.lat,
            "lon": req.body.lon ?? paisActual.lon
        }
        const pais = await paisService.editarPais(req.body, id)
        if (pais) res.status(202).json(pais)
        else res.status(404).json({ message: "Ciudad no encontrada" })
    } catch (error) {
        res.status(500).json({ message: "Error al reemplazar el pais" })
    }
}