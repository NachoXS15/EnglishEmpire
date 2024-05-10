import express from 'express';

import cursosRoutes from './src/routes/cursos.routes.js'
import staffRoutes from './src/routes/staff.routes.js'

const app = express();
const port = 3000
app.use(express.json());
app.use('/api', cursosRoutes)
app.use('/api', staffRoutes)
app.use('/', (req, res) => {
    res.json({
        estado: 'ok'
    })
})
app.listen(port);
console.log('Server on port: ', `${port}`);