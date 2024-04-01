import express from 'express';
import { getAllCursos, postCurso } from '../controllers/cursosController.js';
const router = express.Router()

router.get('/', getAllCursos)
router.post('/', postCurso)

export default router;