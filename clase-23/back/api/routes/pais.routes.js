import { Router } from "express"
import * as paisController from "../controllers/pais.controller.js"
import { ciudadValidate } from "../../middlewares/ciudad.validate.js"
import { validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/paises", [validateToken], paisController.getPais)
router.get("/api/paises/:id", paisController.getPaisById)
router.post("/api/paises",[ciudadValidate], paisController.savePais)
router.post("/api/paises/:id/favoritos", paisController.savePaisFavorito)
router.delete("/api/paises/:id/favoritos", paisController.deletePaisFavorito)
router.delete("/api/paises/:id", paisController.deletePais)
router.put("/api/paises/:id",[ciudadValidate], paisController.replacePais)
router.patch("/api/paises/:id",[ciudadValidate], paisController.updatePais)

export default router