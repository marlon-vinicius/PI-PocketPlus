import { Router } from "express";
import usuarioController from '../controllers/usuarioController.js';

const router = Router();

router.post('/', usuarioController.criarUsuario);

export default router;