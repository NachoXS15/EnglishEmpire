import express from 'express';
import { getAllCursos } from '../controllers/cursosController.js';
const router = express.Router()

router.get('/', getAllCursos)

export default router;