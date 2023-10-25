import prisma from '../database/client.js';

const controller = {};

controller.criarTransacao = async function (req, res) {
  try {
    const { data, valor, tipo, categoria, descricao } = req.body;

    await prisma.transacao.create({
      data: {
        data,
        valor,
        tipo,
        categoria,
        descricao
      },
    });

    res.status(201).json({ message: 'Despesa cadastrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao cadastrar a despesa' });
  }
};

export default controller;