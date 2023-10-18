const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client-mongodb');
const prisma = new PrismaClient();

app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});