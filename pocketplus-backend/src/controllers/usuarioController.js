const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criarUsuario = async (req, res) => {
  try {
    const { nome, cpf, email, senha } = req.body;
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        cpf,
        email,
        senha,
      },
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

const listarUsuarios = async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
};

module.exports = {
  criarUsuario,
  listarUsuarios,
};