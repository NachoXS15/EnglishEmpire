import db from '../database/db.js'
import { DataTypes } from "sequelize";

const StaffModel = db.define('staff', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: true},
    nombre: {type: DataTypes.TEXT},
    cargo: {type: DataTypes.TEXT},
    imagen: {type: DataTypes.TEXT},
    createdAT: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
})

export default StaffModel;