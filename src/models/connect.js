import { Sequelize } from "sequelize";
import dbConfig from '../config/db.config.js'

let {dbHost, dbUser, dbPass, dbPort, dbDialect, dbName} = dbConfig

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect
});

// try {
//     await sequelize.authenticate();  // xác minh là đã connect thành công database hay chưa
//     console.log("Connect Successfully");
// } catch (error) {
//     console.log("Connect fail!");
// }

export default sequelize;