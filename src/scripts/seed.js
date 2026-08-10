import sequelize from '../config/database.js';
import { Person, Role, AppUser } from '../models/index.js';
import { hashPassword } from '../services/auth.service.js';

export async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Iniciando SEED..')

        //Creacion de administrador de ROL
        const [adminRole] = await Role.findOrCreate({
            where: { name: 'admin' },
      
        });

        //Creacion de administrador de PERSONA
        const [adminPersona] = await Person.findOrCreate({
            where: { email: 'admin@admin.com' },
            defaults: {
                full_name: 'ADminstrador',
                phone_number: '+56999999999'
            }
        });

        console.log('ADMINISTRADOR', adminPersona.id);

        // 3.- crear el usuario persona 
        const existingUser = await AppUser.findOne({ where: { username: 'admin' } });

        if (existingUser) {
            console.log('el usuario ADMIN ya existe');
        } else {
            const passwordHash = await hashPassword('Admin123!');
            const adminUsern = await AppUser.create({
                username: 'admin',
                password_hash: passwordHash,
                person_id: adminPersona.id,
                role_id: adminRole.id,
                is_active: true,
            });
            console.log('UsurioADMIN Creado', adminUsern.username);
            console.log('Credenciales u:admin p:Admin123!');
        }
        console.log('seed completa');
        // process.exit(0);
    } catch (error) {
        console.log('ERROR en el seed ', error.message);
        // process.exit(1);
    }
}



