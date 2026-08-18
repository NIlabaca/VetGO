import Person from "./person.model.js";
import Role from "./role.model.js";
import AppUser from "./appUser.model.js";
import Species from "./species.models.js";

// 1 PERSONA como max. tiene 1 CUENTA/USUARIO
Person.hasOne(AppUser, {foreignKey: 'person_id'});
AppUser.belongsTo(Person, {foreignKey: 'person_id'});

// 1 ROL puede tener muchos USUARIOS
Role.hasMany(AppUser, {foreignKey: 'role_id'});
AppUser.belongsTo(Role, {foreignKey: 'role_id'});




export { Person, Role, AppUser, Species};