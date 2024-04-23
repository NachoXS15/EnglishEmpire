import { Sequelize } from 'sequelize';

const db = new Sequelize('englishempire', 'root', "" || null, {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;
