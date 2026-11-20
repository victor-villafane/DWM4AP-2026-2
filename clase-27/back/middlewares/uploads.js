import multer from "multer"
import { randomUUID } from "node:crypto"
import { unlink } from "fs/promises"
import { existsSync } from "node:fs"
import sharp from "sharp"
import { supabase } from "../services/supabase.service.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, randomUUID() + ".jpg")
    }
})

export const upload = multer({ storage })

export async function resize(req, res, next) {
    if (!req?.file) next()

    const nombre = randomUUID() + ".webp"
    
    try {
        const buffer = await sharp(req.file.path)
            .resize(1200)
            .webp()
            // .toFile("uploads/" + nombre )
            .toBuffer()
        if( req.file.path && existsSync(req.file.path) ){
            await unlink(req.file.path)
        }
        const { error } = await supabase.storage.from("uploads").upload(nombre, buffer, {
            contentType: "image/webp",
            upsert: false
        })
        const {data} = supabase.storage.from("uploads").getPublicUrl(nombre)
        console.log(data)
        req.file.filename = data.publicUrl
        next()
    } catch (error) {

    }
}