import { DataTypes } from "sequelize";
import db from '../database/db.js';

const cursoModel = db.define("cursos", {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: true},
    nombre_curso: {type: DataTypes.TEXT},
    id_categoria: {type: DataTypes.INTEGER},
    inicio: {type: DataTypes.TEXT},
    fin: {type: DataTypes.TEXT},
    descripcion: {type: DataTypes.TEXT},
    id_profesor: {type: DataTypes.INTEGER},
    costo: {type: DataTypes.INTEGER},
    programa: {type: DataTypes.TEXT, allowNull: true}
})

export default cursoModel;