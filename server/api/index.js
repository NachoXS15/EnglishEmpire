import express from 'express';
import cors from 'cors'
import cursosRoutes from '../src/routes/cursos.routes.js'
import staffRoutes from '../src/routes/staff.routes.js'

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use(express.json());
app.use('/cursos', cursosRoutes)
app.use('/staff', staffRoutes)
app.use('/', (req, res) => {
    res.json({
        estado: 'ok'
    })
})
app.listen(3001, () => console.log('Server on port: ', 3001));
export default app