import { Router } from "express";
import { prisma } from "../database/db.js";
const router = Router();

router.get('/', async(req, res) => {
    try {
        const cursos = await prisma.cursos.findMany();
        res.json(cursos);
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const cursosOne = await prisma.cursos.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.json(cursosOne)
    } catch (error) {
        return res.status(400).json({'error': error.message})
    }
})

router.post('/', async(req, res) => {
    try {
        const newcurso = await prisma.cursos.create({
            data: req.body
        })
        res.json({
            message: 'ok'
        })
        
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/:id', async(req, res) => {
    try {
        await prisma.cursos.update({
            where:{
                id: parseInt(req.params.id)
            }
        })
    } catch (error) {
        return res.status(400).json({'error': error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const cursoDeleted = await prisma.cursos.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.json('Eliminado')
    } catch (error) {
        return res.status(400).json({'error': error.message})
    }
})


export default router;