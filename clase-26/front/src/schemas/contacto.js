import { z } from "zod"

export const contactoSchema = z.object({
    nombre: z.string("El campo nombre es obligatorio")
        .min(3, "Debe tener al menos 3 caracteres")
        .max(60, "No puede superar los 60 caracteres"),
    email: z.email("Ingresa un email válido"),
    asunto: z.string("Selecciona un asunto").min(1, "Selecciona un asunto"),
    mensaje: z.string("El campo mensaje es obligatorio")
        .min(10, "Debe tener al menos 10 caracteres")
        .max(500, "No puede superar los 500 caracteres")
}, "JSON invalido")
