import 'dotenv/config';
import app from './app.js';
import env from './config/environment.js';
import {checkConnection} from './config/database.js';

async function startServer() {
    await checkConnection();
    app.listen(env.port, () => {
        console.log(`Servidor corriendo en http://localhost:${env.port}`);
    });
}


startServer()