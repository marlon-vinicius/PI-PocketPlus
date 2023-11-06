import { Router } from "express";

import transacaoController from '../controllers/transacaoController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, transacaoController.criarTransacao);
router.get('/ultimas', auth, transacaoController.ultimas);
router.get('/todas', auth, transacaoController.todas);
router.get('/filtradas', auth, transacaoController.filtradas);

export default router;