//import cursoModel from "../models/cursoModel.js";
import db from "../database/db.js";
import {Sequelize, QueryTypes } from "sequelize";
import cursoModel from "../models/cursoModel.js";
const { GETALLCURSOS } = process.env

export const getAllCursos = async(req, res) => {
    try {
        const cursos = await db.query(GETALLCURSOS, {type: QueryTypes.SELECT})
        res.json(cursos)
    } catch (error) {
        console.log("error al traer cursos", error.message)
    }
}

export const getOneCurso = async(req, res) => {
    try {
        const curso = await cursoModel.findOne({where: {id: req.params.id}})
        console.log(curso)
        res.json(curso)
    } catch (error) {
        console.log("error al traer un curso: ", error.message)
    }
}

export const postCurso = async(req, res) => {
    try {
        await cursoModel.create(req.body)
        console.log(cursoModel)
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        console.log("error al crear: ", error.message)
    }
}

export const updateCurso = async(req, res) => {
    try {
        await cursoModel.update(req.body, {where: {id: req.params.id}});
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al actualizar")
    }
}

export const deleteCurso = async(req, res) => {
    try {
        await cursoModel.destroy({where: {id: req.params.id}})
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al eliminar")
    }
}
