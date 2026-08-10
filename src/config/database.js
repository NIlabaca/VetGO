import { Sequelize } from 'sequelize';
import environment from './environment.js';

const sequelize = new Sequelize(
    environment.db.database,
    environment.db.user,
    environment.db.password,
    {
        host: environment.db.host,
        port: environment.db.port,
        dialect: 'postgres',
        logging: false,
    }
);

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexion con Postgres (SEQUELIZE) exitosa');
    } catch (error) {
        console.error('Error conectando PostgreSQL:', error.message);
    }
}

export { checkConnection };
export default sequelize;