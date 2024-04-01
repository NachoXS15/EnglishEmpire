import express from 'express';
import { deleteCurso, getAllCursos, postCurso, updateCurso } from '../controllers/cursosController.js';
const router = express.Router()

router.get('/', getAllCursos)
router.post('/', postCurso)
router.put('/:id', updateCurso)
router.delete('/:id', deleteCurso)
export default router;