import jwt from "jsonwebtoken";

function verificarToken(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({message: 'Token não fornecido!'});
    }

    try {
        const decodificado = jwt.verify(token,  process.env.JWT_TOKEN)
        req.usuario = decodificado;
    } catch (error) {
        return res.status(403).json({message: 'Token inválido'});
    }

    next();
}

export default verificarToken;