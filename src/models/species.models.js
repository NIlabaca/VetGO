import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Species = sequelize.define('Species', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    common_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    }, 
},{
    tableName:'species',
    timestamps: false,
});

export default Species;