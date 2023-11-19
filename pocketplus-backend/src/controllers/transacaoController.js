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
      take: 5,
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

controller.todas = async function(req, res) {
  try {
    const result = await prisma.transacao.findMany({
      where: { usuarioId: req.usuario.user_id },
      orderBy: { categoria: 'desc' }

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
    const categoriaSelecionada = req.query.categoria;
    if (!categoriaSelecionada || categoriaSelecionada == "") {
      res.status(400).send("Categoria não especificada");
      return;
    }

    const result = await prisma.transacao.findMany({
      where: {
        usuarioId: req.usuario.user_id,
        categoria: categoriaSelecionada,
      },
      orderBy: { data: 'desc' },
    });

    if (result.length !== 0) {
      res.send(result);
    } else {
      
      res.status(404).json({ message: "Nenhuma despesa ou receita encontrada para a categoria selecionada." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

controller.update = async function(req, res) {
  try {
    const { id } = req.params;
    const { categoria, tipo, descricao, data } = req.body;
    const valor = Number(req.body.valor);

    const updatedTransacao = await prisma.transacao.update({
      where: { id: id },
      data: {
        categoria: categoria,
        tipo: tipo,
        descricao: descricao,
        valor: valor,
        data: data,
      },
    });

    res.status(200).json(updatedTransacao);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

controller.delete = async function(req, res) {
  try {
    const { id } = req.params;

    const result = await prisma.transacao.delete({
      where: { 
        id: id,
        usuarioId: req.usuario.user_id }
      })

    if(result) res.status(204).end()
    else res.status(404).end()

  } catch (error) {
    console.error(error)
      res.status(500).send(error)
  }
}

export default controller;