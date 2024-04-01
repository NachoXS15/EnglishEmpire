import express from 'express'
import { deleteStaff, getAllStaff, getOneStaff, postStaff, updateStaff } from "../controllers/staffController.js";
const router = express.Router();

router.get('/', getAllStaff)
router.get('/:id', getOneStaff)
router.post('/', postStaff)
router.put('/:id', updateStaff)
router.delete('/:id', deleteStaff)

export default router;