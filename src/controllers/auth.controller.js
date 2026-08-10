import { AppUser, Person, Role } from '../models/index.js';
import { comparePassword, generateToken } from '../services/auth.service.js'

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Usuario y Contraseña obligatoria'
            })
        }
        // Busca el ususrio
        const user = await AppUser.findOne({
            where: { username },
            include: [Person, Role],
        });

        if (!user) {
            return res.status(401).json({ message: 'Creedenciales invalido' });
        }

        if (!user.is_active) {
            return res.status(403).json({ message: 'Usuario inactivo' });
        }

        const isValid = await comparePassword(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ message: 'Creedenciales invalido' });
        }

        //Genera el token
        const token = generateToken({
            id: user.id,
            username: user.username,
            role_id: user.role_id,
        });

        res.json({
            message: 'Login exitoros',
            token,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.Person?.fullName,
                role_id: user.Role?.name,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};
