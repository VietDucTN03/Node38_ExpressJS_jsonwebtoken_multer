// express, mysql, sequelize, sequelize-auto, nodemon, cors

// npm init
// npm i express mysql2 sequelize, sequelize-auto nodemon cors 

import express from 'express';
import rootRoutes from "./src/routes/rootRoutes.js";
import cors from "cors"

const app = express();
const port = 8081;

// Đúng theo thứ tự vì BE đọc code từ trên xuống
app.use(express.json());  // middleware parse body string -> body json
app.use(express.static(".")) // middleware để xác định lưu file
app.use(cors());  // cho tất cả các request(FE) từ bên ngoài vào để tương tác với BE
app.use(rootRoutes);

app.get('/', (req, res) => {
    res.send('Hello Node38 youtube!');
})

app.listen(port, () => {
    console.log("Server running on port 8081");
});

/*
    Lệnh cài đặt cloudinary
    npm install cloudinary multer multer-storage-cloudinary

    cloudinary -> lib giúp mình tương tác với cloudinary server
    multer -> lib giúp mình lấy được file từ local 
    multer-storage-cloudinary -> lib trung gian giúp mình upload file từ local lên cloudinary server
*/

/*
    prisma -> ORM 
    prisma/client -> lib giúp mình tương tác với DB thông qua prisma

    b1: init prisma
        npx prisma init - yarn prisma init
    b2: pull model từ mysql
        npx prisma db pull - yarn prisma db pull
    b3: tạo prisma client để tương tác với sql
        npx prisma generate - yarn prisma generate
    b4: copy code từ terminal và sử dụng 
    
*/