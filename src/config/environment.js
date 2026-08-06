import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const result = dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// console.log('Resultado dotenv:', result);

// Objeto de condiguracion 
const environment = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
    }
};

if (!environment.db.user || !environment.db.password){
    console.error('error en creedenciales');
    process.exit(1);  
}

export default environment;