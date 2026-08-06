// Middleware de manejo de errores centralizado
// Express lo reconoce como "manejador de errores" porque tiene 4 parámetros (err, req, res, next)
// Debe registrarse SIEMPRE al final de app.js, después de todas las rutas

export default function errorHandler(err, req, res, next) {
    // Registra el error completo en consola
    console.error(err.stack);

    // Si el error trae un status propio (ej: err.status = 404), se usa ese;
    // si no, se asume error interno del servidor (500)
    const statusCode = err.status || 500;

    // Respuesta uniforme en formato JSON para cualquier error de la API
    res.status(statusCode).json({
        status: 'ERROR',
        message: err.message || 'Error interno del servidor',
    });
}