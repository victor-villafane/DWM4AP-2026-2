import * as paisController from "../controllers/pais.controller.js"
import { Router } from "express"

const router = Router()

router.get("/paises", paisController.getPaises)
router.get("/paises/:id",  paisController.getPaisesById)

export default router