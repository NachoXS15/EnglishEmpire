import staffModel from "../models/staffModel.js";
import db from "../database/db.js";
import { QueryTypes } from "sequelize";
const {GETALLSTAFF} = process.env
import dotenv from 'dotenv'
//getAll
export const getAllStaff = async(req, res) => {
    try {
        const staff = await db.query(GETALLSTAFF, {type: QueryTypes.SELECT})
        res.json(staff)
    } catch (error) {
        console.log("Error al traer staff: ", error.message);
    }
}

export const getOneStaff = async(req, res) => {
    try {
        const staff = await staffModel.findOne({where: {id: req.params.id}})
        console.log(staff)
        res.json(staff)
    } catch (error) {
        console.log("error al traer un coso: ", error.message)
    }
}

export const postStaff = async(req, res) => {
    try {
        await staffModel.create(req.body)
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        console.log("error al crear: ", error.message)
    }
}

export const updateStaff = async(req, res) => {
    try {
        await staffModel.update(req.body, {where: {id: req.params.id}});
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al actualizar")
    }
}

export const deleteStaff = async(req, res) => {
    try {
        await staffModel.destroy({where: {id: req.params.id}})
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al eliminar")
    }
}


