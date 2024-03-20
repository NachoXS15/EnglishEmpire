import express from 'express'
import { getAllStaff } from "../controllers/staffController.js";
const router = express.Router();

router.get('/', getAllStaff)

export default router;