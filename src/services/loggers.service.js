import { error, time } from 'console';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Ruta donde se guardaran los logs
const logFilePath = path.resolve(__dirname, '../logs/log.txt');

// Funcion que recibe mensaje y lo agrega al log
export const writeLog = (message) => {
    const timestamp = new Date().toLocaleString('es-CL', {timeZone: 'America/Santiago'});
    const logLine = `[${timestamp}] ${message}\n`;

    //appendFile agrega la linea al final de la ultima
    fs.appendFile(logFilePath, logLine, (error) => {
        if (error){
            console.error('Error en el log:', error.message);
        }
    });
};