import * as paisController from "../controllers/pais.controller.js"
import { Router } from "express"

const router = Router()

router.get("/paises", paisController.getPaises)
router.get("/paises/nuevo",  paisController.nuevoPaisForm) // Route -> controller -> View/Service
router.post("/paises/nuevo",  paisController.guardarPais) // Route -> controller -> View/Service
router.get("/paises/editar/:id",  paisController.editarPaisForm) // Route -> controller -> View/Service
router.get("/paises/eliminar/:id",  paisController.eliminarPaisForm) // Route -> controller -> View/Service
router.post("/paises/eliminar/:id",  paisController.eliminarPais) // Route -> controller -> View/Service
router.get("/paises/:id",  paisController.getPaisesById)

export default router