import { Router } from "express";
import { prisma } from "../../database/db.js";
const router = Router();

router.get('/cursos', async(req, res) => {
    try {
        const cursos = await prisma.cursos.findMany();
        res.json(cursos);
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/cursos/:id', async (req, res) => {
    try {
        const cursosOne = await prisma.cursos.findUnique({
            where: req.params.id
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.post('/cursos', async(req, res) => {
    try {
        const newcursos = await prisma.cursos.create({
            data: req.body
        })
        res.json({
            message: 'ok'
        })
        
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/cursos/:id', async(req, res) => {
    try {
        await prisma.cursos.update({
            where: req.params.id
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.delete('/cursos/:id', async (req, res) => {
    try {
        await prisma.cursos.delete({where: req.params.id})
    } catch (error) {
        console.log(error.message);
    }
})


export default router;