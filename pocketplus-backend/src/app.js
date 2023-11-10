import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

import publicaRouter from './routes/publicaRoutes.js';
import transacaoRouter from './routes/transacaoRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js';
import valorRouter from './routes/valorRoutes.js'
import receitaRouter from './routes/receitaRoutes.js'

app.use("/", publicaRouter);
app.use("/transacao", transacaoRouter);
app.use("/usuario", usuarioRouter);
app.use("/despesas", valorRouter);
app.use("/receitas", receitaRouter);

export default app;