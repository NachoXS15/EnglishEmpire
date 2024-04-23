import StaffModel from "../models/staffModel.js";
import db from "../database/db.js";
import { QueryTypes } from "sequelize";
const {GETALLSTAFF} = process.env
//getAll
export const getAllStaff = async(req, res) => {
    try {
        const staff = await StaffModel.findAll()
        res.json(staff)
    } catch (error) {
        console.log("Error al traer staff: ", error.message);
    }
}

export const getOneStaff = async(req, res) => {
    try {
        const staff = await StaffModel.findOne({where: {id: req.params.id}})
        console.log(staff)
        res.json(staff)
    } catch (error) {
        console.log("error al traer un staff: ", error.message)
    }
}

export const postStaff = async(req, res) => {
    try {
        await StaffModel.create(req.body);
        res.json({
            "message": 'ok'
        })
    } catch (error) {
        throw new Error("error al actualizar") + error.message
    }
}
export const updateStaff = async(req, res) => {
    try {
        await StaffModel.update(req.body, {where: {id: req.params.id}});
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al actualizar") + error.message
    }
}

export const deleteStaff = async(req, res) => {
    try {
        await StaffModel.destroy({where: {id: req.params.id}})
        res.json({
            operation: 'ok'
        })
    } catch (error) {
        throw new Error("error al eliminar")
    }
}


