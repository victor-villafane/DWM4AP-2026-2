import { Router } from "express"
import * as paisController from "../controllers/pais.controller.js"

const router = Router()

router.get("/api/paises", paisController.getPais)
router.get("/api/paises/:id", paisController.getPaisById)
router.post("/api/paises", paisController.savePais)
router.delete("/api/paises/:id", paisController.deletePais)
router.put("/api/paises/:id", paisController.replacePais)
router.patch("/api/paises/:id", paisController.updatePais)

export default router