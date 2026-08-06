import pg from 'pg';
import environment from './environment.js';

const { Pool } = pg

const pool = new Pool({
    user: environment.db.user,
    host: environment.db.host,
    database: environment.db.database,
    password: environment.db.password,
    port: environment.db.port,
});

async function checkConnection() {
    try {
        const client = await pool.connect();
        console.log('Conexion con Postgres exitosa');
        client.release()
    } catch (error) {
        console.error('Error conectando PostgreSQL:', error.message);
    }
}


export {checkConnection};
export default pool;