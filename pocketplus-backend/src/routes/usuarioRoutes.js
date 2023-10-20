import { Router } from "express";
const router = Router();
import usuarioController from '../controllers/usuarioController';

router.post('/registrar', usuarioController.criarUsuario);

export default router;