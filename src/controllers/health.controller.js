import db from '../config/database.js'; // Importa el Pool de conexion Postgrest

// Controladore para verificar conexion a base de datos
export const checkHealth = async (req, res) => {
    try {
        //Consulta basica para probar
        await db.query('SELECT 1');
        res.json({ status: 'UP', message: 'La base de datos responde correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'DOWN', message: 'La base de datos no responde', error: error.message });
    }
};