import staffModel from "../models/staffModel";
import db from "../database/db";

//getAll
export const getAllStaff = async(req, res) => {
    try {
        const staff = await staffModel.findAll();
        res.json(staff)
    } catch (error) {
        console.log("Error al traer staff: ", error.message);
    }
}
