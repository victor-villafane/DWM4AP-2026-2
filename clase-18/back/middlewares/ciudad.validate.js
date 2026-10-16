import { ciudadSchema } from "../schemas/ciudad.js"

export async function ciudadValidate(req, res, next){
    console.log("validate")
    try {
        const ciudad = await ciudadSchema.parseAsync(req.body)
        req.body = ciudad
        next()
    } catch (errors) {
        const messages = errors.issues.map( error => `${error.path}: ${error.message}` )
        res.status(400).json(messages)
    }
}