//Controladores para la ruta raiz 
import { APP_NAME, APP_VERSION, APP_DESCRIPTION, STATUS } from '../utils/constants.js';

// Mensaje de bienvenida 
export const getHome = (req, res) => {
    res.json({
        messege: `Bienvenido a ${APP_NAME}`,
    });
};

//Util para saber si el proceso Node esta activo
export const getServerStatus = (req, res) => {
    res.json({
        status:STATUS.UP,
        uptime: process.uptime(), //Tiempo en segundos que lleva corriendo
        timestamp: new Date().toISOString(),
    });
}

// Informacion del proyecto
export const getProjectInfo = (req, res) => {
    res.json({
        name:APP_NAME,
        version:APP_VERSION,
        environment: process.env.NODE_ENV || 'development',
        description: APP_DESCRIPTION ,
    });
}
