import prisma from '../database/client.js';

const controller = {};

controller.buscarDespesas = async function( req, res ) {
    try {
        let valorDespesas = 0
        const result = await prisma.valor.findMany({
            where: { usuarioId: req.usuario.user_id }
            
        })

        if(result.valor != 0) {
            valorDespesas =+ result.valor
            console.log(valorDespesas);
        }

    } catch (error) {

        console.error(error)

        res.status(500).send(error)
    }
}

export default controller;