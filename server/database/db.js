import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' })
const { USERNAME, PASSWORD, HOSTNAME, DATABASE } = process.env

const db = new Sequelize('englishempire', 'root', "" || null, {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;
