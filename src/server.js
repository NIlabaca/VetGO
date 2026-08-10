import 'dotenv/config';
import app from './app.js';
import env from './config/environment.js';
import { checkConnection } from './config/database.js';
import { seed } from './scripts/seed.js';
import environment from './config/environment.js';

async function startServer() {
    await checkConnection();

    if (environment.nodeEnv == 'development') {
        await seed();
    };

    app.listen(env.port, () => {
        console.log(`Servidor corriendo en http://localhost:${env.port}`);
    });



}


startServer()