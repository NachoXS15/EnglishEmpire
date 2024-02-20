import express from "express";
import cors from 'cors';
import axios from 'axios';
const port = 3000;
const app = express();
//permitir origines
app.use(cors());

//importar enrutadores
app.use(express.json());


app.listen(port, () => {
    console.log(`ejecutando en puerto ${port}`)
})

