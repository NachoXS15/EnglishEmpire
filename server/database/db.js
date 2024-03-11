import dotenv from dotenv;
import { Sequelize } from 'sequelize';
const {USERNAME, PASSWORD, HOSTNAME, DATABASE } = process.env

const db = new Sequelize(DATABASE, USERNAME, HOSTNAME || null, {
    host: HOSTNAME,
    dialect: 'mysql'
})

export default db;
