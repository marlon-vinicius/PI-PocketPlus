import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import usuarioRoutes from './routes/usuarioRoutes';

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/usuario", usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

export default app;