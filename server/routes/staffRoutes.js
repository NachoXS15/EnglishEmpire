import express from 'express'
const router = express.Router();
import { getAllStaff } from "../controllers/staffController";

router.get('/', getAllStaff)

export default router;