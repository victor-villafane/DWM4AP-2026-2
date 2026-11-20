import { z } from "zod"

export const usuarioSchema = z.object({
    _id: z.string().optional(),
    name: z.string("El campo nombre es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
    username: z.string("El campo username es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
    email: z.email("El campo email es obligatorio y tiene que ser un mail valido"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe tener una letra mayuscula")
        .regex(/[a-z]/, "Debe tener una letra minuscula")
        .regex(/[0-9]/, "Debe tener un numero")
        .regex(/[@#!~%/()=]/, "Debe tener un simbolo @#!~%/()="),
    passwordConfirm: z.string("Es obligatorio"),
    rol: z.enum(["user", "admin", "superadmin"]).default("user")
}, "JSON invalido")
    .refine((data) => data.password == data.passwordConfirm, {
        error: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],
    });