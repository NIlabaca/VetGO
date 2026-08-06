import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.middleware.js'
import loggerMiddleware from './middlewares/loggers.middleware.js'; //MIDDLEWARE DE LOGS

//
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crea la instancia de express
const app = express();

// -- Middlewares globales --
// permite que express interprete JSON
app.use(loggerMiddleware);
app.use(express.json());


//--Rutas--
//Bootstrap 

// Todas definidas de index.js
app.use('/api', routes); 

// Rutas estaticas y publicas

app.use(express.static(path.join(__dirname, 'public')));


// --- Manejo de Errores ---
app.use(errorHandler);

export default app;