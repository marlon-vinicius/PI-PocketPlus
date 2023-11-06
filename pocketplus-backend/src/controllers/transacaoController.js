import prisma from '../database/client.js';

const controller = {};

controller.criarTransacao = async function (req, res) {
  try {
    const { data, tipo, categoria, descricao } = req.body;
    
    const valor = Number(req.body.valor);

    const usuarioId = req.usuario.user_id;

    await prisma.transacao.create({
      data: {
        usuarioId,
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

controller.ultimas = async function(req, res) {
  try {
    const result = await prisma.transacao.findMany({
      where: { usuarioId: req.usuario.user_id },
      take: 5
    })

    if(result) res.send(result)

    else res.status(404).end()
  }

  catch(error) {

    console.error(error)

    res.status(500).send(error)
  }
}

controller.todas = async function(req, res) {
  try {
    const result = await prisma.transacao.findMany({
      where: { usuarioId: req.usuario.user_id },
      orderBy: { data: 'desc' }

    })

    if(result) res.send(result)

    else res.status(404).end()
  }
  
  catch(error) {

    console.error(error)

    res.status(500).send(error)
  }
}

controller.filtradas = async function(req, res) {
  try {
    const result = await prisma.transacao.findMany({
      where: { usuarioId: req.usuario.user_id, categoria: req.body },
      orderBy: { data: 'desc' }

    })

    if(result) res.send(result)

    else res.status(404).end()
  }
  
  catch(error) {

    console.error(error)

    res.status(500).send(error)
  }
}

export default controller;