import { Router } from "express";
import publicaRouter from '../controllers/publicaController.js';

const router = Router();

router.post('/login', publicaRouter.autenticar);
router.post('/registrar', publicaRouter.criarUsuario);

export default router;