import { Router } from "express"
import * as usuarioController from "../controllers/usuario.controller.js"
import { validateRol, validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/usuarios",[validateToken, validateRol(["superadmin"])], usuarioController.getUsuarios)
router.post("/api/usuarios",[], usuarioController.saveUser)
router.post("/api/usuarios/login",[], usuarioController.login)
// router.get("/api/paises/:id", paisController.getPaisById)
// router.post("/api/paises", paisController.savePais)
// router.delete("/api/paises/:id", paisController.deletePais)
// router.put("/api/paises/:id", paisController.replacePais)
// router.patch("/api/paises/:id", paisController.updatePais)

export default router