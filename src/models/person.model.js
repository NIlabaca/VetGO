import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Person = sequelize.define('Person', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },  
},{
    tableName:'persons',
    timestamps: false,
});

export default Person;