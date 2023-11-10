import prisma from '../database/client.js';
import jwt from "jsonwebtoken";

const controller = {};

controller.autenticar = async function (req,res){
  const auth = {email: req.body.email, senha: req.body.senha};

  if ((!auth.email || auth.email == '') || (!auth.senha || auth.senha == '')) {
    return res.status(400).send("Todos os campos são necessários!");
  }

   const usuario = await prisma.usuario.findUnique({
     where: { email: auth.email },
   });

   if(!usuario || (usuario?.senha != auth.senha)){
     return res.status(403).json({ error: 'Usuário e/ou senha inválidos.' });
   }

   const token = jwt.sign(
     { user_id: usuario.id},
     process.env.JWT_TOKEN,
     {
       expiresIn: "2h",
     }
   );

   const user = {
     usuario: usuario.id,
     nome: usuario.nome,
     token: token
   }

  return res.status(200).json(user);

}

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

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export default controller;