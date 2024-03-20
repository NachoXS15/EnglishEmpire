import { Sequelize, DataTypes } from "sequelize";
import db from '../database/db.js'

const staffModel = db.define('staff', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: true},
    nombre: {type: DataTypes.TEXT},
    cargo: {type: DataTypes.TEXT},
    imagen: {type: DataTypes.TEXT}
})

export default staffModel