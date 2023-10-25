import { Router } from "express";

import transacaoController from '../controllers/transacaoController.js';

const router = Router();

router.post('/', transacaoController.criarTransacao);

export default router;