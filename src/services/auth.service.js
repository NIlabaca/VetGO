import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

const SALT_ROUNDS = 10;

// Hashea la constraseña en texto antes de guardarla en BD
export const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

// Compara una contraseña de texto = con el hash guardado
export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// Genera JWT con el id y el username
export const generateToken = (payload) =>{
    return jwt.sign(payload, environment.jwtSecret, { expiresIn: '2h' });  // Duracion del token
};

// vErifica y decodifica jwt
export const verifyToken = (token) =>{
    return jwt.verify(token, environment.jwtSecret); 
};