import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config({path: './.env'})
const {USERNAME, PASSWORD, HOSTNAME, DATABASE } = process.env

const db = new Sequelize(DATABASE, USERNAME, PASSWORD || null, {
    host: HOSTNAME,
    dialect: 'mysql'
})

export default db;
