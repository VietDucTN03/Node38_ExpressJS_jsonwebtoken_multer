import { createToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

import bcrypt from 'bcrypt';

const conn = initModels(sequelize);

const login = async (req, res) => {
    try {
        let {email, password} = req.body;
        // Check email có tồn tại trong DB hay không
        let data = await conn.users.findOne({
            where: {
                email: email
            }
        })
        if(data) {  // Nếu tìm thấy user trong DB
            /*
                Trường hợp 1: nếu có trong DB -> tạo token
                Thư viện để tạo token -> jsonwebtoken
                Thư viện để mã hóa password -> bcrypt
            */
            /*
                check Password
                nếu Password đúng -> tạo token
                ngược lại -> lỗi 

                compare password -> compareSync có 2 params
                param 1: password nhập từ request (password chưa mã hóa)
                param 2: password được mã hóa
            */
            let checkPassword = bcrypt.compareSync(password, data.pass_word)
            if (checkPassword) {
                let payload = {
                    email,
                    password,
                    user_id: data.user_id
                }
                let token = createToken(payload);
                res.status(200).send(token);
            } else {
                res.status(400).send("Password incorrect!")
            }
        } else {
            // Trường hợp 2: nếu không có trong DB -> báo lỗi
            res.status(404).send("Login fail");
        }

        // res.send({emailInput, password})
    } catch(error) {
        res.send(`Error: ${error}`);
    }
}

const signUp = async (req, res) => {
    try {
        let {username, email, password, role} = req.body;
        // kiểm tra user đã tồn tại trong DB hay chưa
        let data = await conn.users.findOne({
            where: {
                email: email
            }
        })

        if(data) {  // Trường hợp 1: nếu user đã tồn tại
            res.status(400).send("User is existed!");
        } else {  // Trường hợp 2: nếu chưa có user trong DB
            // Mã hóa password trước khi create user (bcrypt)
            /* 
                hashSync có 2 param:
                param 1: password nhận từ request
                param 2: số lần mã hóa Password

                Lưu ý: Khi mà đã mã hóa password -> không thể giải mã 
                phải dùng function có sẵn của bcrypt để compare
            */ 
            let enCodePassword = bcrypt.hashSync(password, 10);  
            let newUser = {
                // tên column: Key nhập
                full_name: username,
                email,
                pass_word: enCodePassword,  // lưu password đã mã hóa
                role,
            }

            await conn.users.create(newUser);
            res.status(201).send("User is created!");
        }
    } catch(error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const loginFacebook = async (req, res) => {
    let {id, name, email} = req.body;  // lấy face_app_id, name, email từ FE

    let newData = {
        full_name: name,
        email,
        face_app_id: id
    }

    let checkUser = await conn.users.findOne({  // Tìm user dựa trên face_app_id lấy từ FE
        where: {
            face_app_id: id
         }
    })

    if(!checkUser) {  // nếu user không tồn tại -> create User -> create token -> trả về FE
        await conn.users.create(newData);
        checkUser = await conn.users.findOne({
            where: {
                face_app_id: id
            }
        })
    }

    // nếu user tồn tại -> tạo token -> trả về FE
    let token  = createToken({checkEmail: checkUser, pass_word: ""});
    res.send(token)
}

export {
    login,
    signUp,
    loginFacebook,
}