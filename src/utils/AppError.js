/**
 * Clasea para errores personalizado: permite errores con status especificos
 */

export default class AppError extends Error {
    constructor (message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // marca esperando

        Error.captureStackTrace(this, this.constructor);
    }
}