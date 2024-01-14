import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node38_youtube", "root", "1234", {
    host: "localhost",
    port: 3307,
    dialect: "mysql"
});

// try {
//     await sequelize.authenticate();  // xác minh là đã connect thành công database hay chưa
//     console.log("Connect Successfully");
// } catch (error) {
//     console.log("Connect fail!");
// }

export default sequelize;