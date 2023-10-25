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

import usuarioRouter from './routes/usuarioRoutes.js';
app.use("/usuario", usuarioRouter);

import transacaoRouter from './routes/transacaoRoutes.js';
app.use("/transacao", transacaoRouter);


export default app;