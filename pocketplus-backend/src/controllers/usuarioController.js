import prisma from '../database/client.js';

const controller = {};

controller.porId = async function (req,res){
  
  const id = req.params.id;

  if ((!id)) {
    return res.status(400).send("O ID fornecido não é válido");
  }

   const usuario = await prisma.usuario.findUnique({
     where: { id: id },
   });

   if(!usuario){
    return res.status(401).json({ error: 'Usuário não identificado.' });
   }

   return res.status(200).json({usuario});
}

export default controller;