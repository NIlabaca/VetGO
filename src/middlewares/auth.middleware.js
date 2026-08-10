import { verifyToken } from '../services/auth.service.js';

//MiddleWare para proteger ruta con JWT

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Error en el TOKEN' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // verifica y decodifica el TOken 
        const decode = verifyToken(token);
        // Guarda los datos del usuario
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'TOKEN invalido' });
    }
}