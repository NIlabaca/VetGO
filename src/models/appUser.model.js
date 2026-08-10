import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AppUser = sequelize.define('AppUser', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    role_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, //, 1 persona =  1 cuenta
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'app_users',
    timestamps: false,
});

export default AppUser;