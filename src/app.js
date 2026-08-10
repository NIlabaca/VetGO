import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.middleware.js'
import loggerMiddleware from './middlewares/loggers.middleware.js'; //MIDDLEWARE DE LOGS
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import viewRoutes from './routes/view.routes.js'

//
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crea la instancia de express
const app = express();


// Configutacion de handlebars
app.engine('hbs', engine({ extname: '.hbs', defaultLayout:'main' ,partialsDir: path.join(__dirname, 'views/partials'),}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// -- Middlewares globales --
app.use(loggerMiddleware);
app.use(express.json()); /*permite que express interprete JSON*/
app.use(express.urlencoded({ extended: true })); /* extrae los datos enviados desde el html a un objryo JS */
app.use(express.static(path.join(__dirname, 'public'))); 

//--Rutas--
// Rutas API
app.use('/api', routes); 

// Rutas de vistas 
app.use('/', viewRoutes);



// --- Manejo de Errores ---
app.use(errorHandler);

export default app;