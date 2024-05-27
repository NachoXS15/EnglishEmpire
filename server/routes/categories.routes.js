import Express from 'express'
import {prisma} from "../database/db.js";
const router = Express.Router();


router.get('/', async(req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.log(error.message);    
    }
})

export default router;