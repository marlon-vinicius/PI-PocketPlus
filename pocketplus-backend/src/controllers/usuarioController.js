import prisma from '../database/client.js';

const criarUsuario = async (req, res) => {
  try {
    const { nome, profissao, valor, email, senha } = req.body;

    const usuarioExistente = await prisma.user.findUnique({
      where: { email: email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    const newUser = await prisma.user.create({
      data: {
        nome,
        profissao,
        email,
        senha,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
};

export default {
  criarUsuario
};