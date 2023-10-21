import prisma from '../database/client.js';

const controller = {};

controller.criarUsuario = async function (req, res) {
  try {
    const { nome, profissao, email, senha } = req.body;
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    await prisma.usuario.create({
      data: {
        nome,
        profissao,
        email,
        senha,
      },
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export default controller;