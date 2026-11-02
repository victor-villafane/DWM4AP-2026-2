import { z } from "zod"
export const ciudadSchema = z.object({
    city: z.string("El campo ciudad es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
    country: z.string("El campo pais es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
    capital: z.string("El campo capital es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
    population: z.number("El campo poblacion es obligatorio").positive("Debe ser un numero positivo"),
    lat: z.number("El campo latitud es obligatorio"),
    lon: z.number("El campo longitud es obligatorio"),
}, "invalido")