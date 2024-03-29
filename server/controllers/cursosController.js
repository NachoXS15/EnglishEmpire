import cursoModel from "../models/cursoModel.js";
import db from "../database/db.js";
import { QueryTypes } from "sequelize";
import dotenv from 'dotenv'
const { GETALLCURSOS } = process.env

export const getAllCursos = async(req, res) => {
    try {
        const cursos = await db.query(GETALLCURSOS, {type: QueryTypes.SELECT})
        res.json(cursos)
    } catch (error) {
        console.log("error al traer cursos", error.message)
    }
}