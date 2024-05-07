import { Router } from "express";
import { prisma } from "../../database/db.js";
const router = Router();
router.get('/staff', async(req, res) => {
    try {
        const staff = await prisma.staff.findMany();
        res.json(staff);
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/staff/:id', async (req, res) => {
    try {
        const staffOne = await prisma.staff.findUnique({
            where: req.params.id
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.post('/staff', async(req, res) => {
    try {
        const newStaff = await prisma.staff.create({
            data: req.body
        })
        res.json({
            message: 'ok'
        })
        
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/staff/:id', async(req, res) => {
    try {
        await prisma.staff.update({
            where: req.params.id
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.delete('/staff/:id', async (req, res) => {
    try {
        await prisma.staff.delete({where: req.params.id})
    } catch (error) {
        console.log(error.message);
    }
})

export default router;