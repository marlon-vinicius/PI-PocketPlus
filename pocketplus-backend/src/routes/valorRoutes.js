import { Router } from "express";
import valorController from '../controllers/valorController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/despesas', auth, valorController.buscarDespesas);

export default router;