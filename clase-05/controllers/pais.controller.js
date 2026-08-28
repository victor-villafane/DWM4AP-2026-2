import * as paisService from "../services/pais.service.js"
import * as paisView from "../views/pais.view.js"

export async function getPaises(req, res) {
    try {
        const paises = await paisService.getPaises()
        res.send( paisView.listadoPaises(paises) )
    } catch (error) {
        res.send(JSON.stringify(error))
    }
}

export async function getPaisesById(req, res) {
    try {
        const id = req.params.id
        const ciudad = await paisService.getPaisesById(id)
        res.send(paisView.ciudadDetalle(ciudad))
    } catch (error) {
        res.send(JSON.stringify(error))
    }
}