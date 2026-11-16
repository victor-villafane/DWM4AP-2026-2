import { ciudadSchema } from "../schemas/ciudad.js"

export async function ciudadValidate(req, res, next) {
    console.log("validate")
    try {
        console.log(req?.file)
        const ciudad = await ciudadSchema.parseAsync({
            ...req.body,
            population: parseInt(req.body.population),
            lat: parseInt(req.body.lat),
            lon: parseInt(req.body.lon),
            portada: req?.file
        })
        console.log(ciudad)
        req.body = ciudad
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => `${error.path.length > 0 ? error.path : "JSON"}: ${error.message}`)
        res.status(400).json(messages)
    }
}