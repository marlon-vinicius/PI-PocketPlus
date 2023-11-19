import { Router } from "express";

import receitaController from '../controllers/receitaController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, receitaController.criarReceita);
router.get('/ultimas', auth, receitaController.ultimas);
router.get('/todas', auth, receitaController.todas);
router.get('/filtradas', auth, receitaController.filtradas);
router.put('/:id', auth, receitaController.update);
router.delete('/:id', auth, receitaController.delete);

export default router;