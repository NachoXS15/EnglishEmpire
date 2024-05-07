import express from 'express';

import cursosRoutes from './src/routes/cursos.routes.js'
import staffRoutes from './src/routes/staff.routes.js'

const app = express()
app.use(express.json());
app.use('/api', cursosRoutes)
app.use('/api', staffRoutes)

app.listen(3000);
console.log('Server on port', 3000);