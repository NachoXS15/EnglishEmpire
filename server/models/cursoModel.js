import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CursoModel = db.define('curso', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: true},
    nombre_curso: {type: DataTypes.TEXT},
    id_categoria: {type: DataTypes.INTEGER},
    inicio: {type: DataTypes.TEXT},
    fin: {type: DataTypes.TEXT},
    descripcion: {type: DataTypes.TEXT},
    id_profesor: {type: DataTypes.INTEGER},
    costo: {type: DataTypes.INTEGER},
    programa: {type: DataTypes.TEXT},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
})

export default CursoModel;