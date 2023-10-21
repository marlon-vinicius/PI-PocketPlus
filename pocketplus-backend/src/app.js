import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import usuarioRouter from './routes/usuarioRoutes.js';

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", usuarioRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

export default app;