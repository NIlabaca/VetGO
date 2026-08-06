// middleware encargado de registrar los archivos logs
import { writeLog } from '../services/loggers.service.js';

//Middleware que registra cada peticion
//Debe ir al principio de app.js 
export default function loggerMiddleware(req, res, next){
    const { method, originalUrl  } = req;
    const message = `${method} ${originalUrl }`;
    console.log(originalUrl)

    writeLog(message);

    next();
}