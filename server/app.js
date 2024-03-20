import express from "express";
import cors from 'cors';
import db from '../server/database/db.js'
import staffRouter from "./routes/staffRoutes.js";
const port = 3000;
const app = express();
//permitir origines
app.use(cors());

//importar enrutadores
app.use(express.json());
app.use('/staff', staffRouter)

try {
    await db.authenticate();
    console.log("Conexion correcta")
} catch (error) {
    console.log("Error al conectar", error.message)
}

app.listen(port, () => {
    console.log(`ejecutando en puerto ${port}`)
})

