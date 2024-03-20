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
