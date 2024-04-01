import db from "../database/db.js";
import CursoModel from "../models/cursoModel.js";
import {Sequelize, QueryTypes } from "sequelize";
const { GETALLCURSOS } = process.env

export const getAllCursos = async(req, res) => {
    try {
        const cursos = await db.query(GETALLCURSOS, {type: QueryTypes.SELECT})
        // const cursos = await CursoModel.findAll()
        res.json(cursos)
    } catch (error) {
        console.log("error al traer cursos", error.message)
    }
}

export const getOneCurso = async(req, res) => {
    try {
        const curso = await CursoModel.findOne({where: {id: req.params.id}})
        console.log(curso)
        res.json(curso)
    } catch (error) {
        console.log("error al traer un curso: ", error.message)
    }
}

export const postCurso = async(req, res) => {
    try {
        await CursoModel.create(req.body)
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        console.log("error al crear", error.message);
    }
}

export const updateCurso = async(req, res) => {
    try {
        await CursoModel.update(req.body, {where: {id: req.params.id}});
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al actualizar") + error.message
    }
}
export const deleteCurso = async(req, res) => {
    try {
        await CursoModel.destroy({where: {id: req.params.id}})
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al eliminar")
    }
}
