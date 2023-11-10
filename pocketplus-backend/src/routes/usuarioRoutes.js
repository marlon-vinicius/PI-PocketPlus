import { Router } from "express";
import usuarioController from '../controllers/usuarioController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/id/:id', auth, usuarioController.porId);

export default router;