import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
// sequelize
import {Sequelize} from 'sequelize'

// prisma
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const Op = Sequelize.Op;
const conn = initModels(sequelize);

const getVideo = async (req, res) => {
    let {page, size} = req.params;
    let num_page = Number(page); // Ép kiểu number
    let num_size = Number(size);
    let index = (num_page - 1) * num_size;

    let {videoName} = req.query;

    try {
        // Phân trang
        // let data = await conn.video.findAll({
        //     limit: num_size,  // Giới hạn số lượng data cần lấy
        //     offset: index  // lấy data bắt đầu từ vị trí thứ index
        // });

        // 
        if (!videoName) {
            videoName = ""
        }
        // sequelize
        // let data = await conn.video.findAll({
        //     where: {
        //         video_name: {
        //             [Op.like]: `%${videoName}%`
        //         }
        //     },
        //     limit: num_size,
        //     offset: index
        // })

        // let data = await conn.video.findAll({
        //     include: ["video_likes", "video_comments"]
        // });

        // prisma
        let data = await prisma.video.findMany({  // findAll
            where: {
                // video_id: 1
                video_name: {
                    contains: videoName
                }
            },
            // phân trang
            take: num_size,  // limit
            skip: index  // offset
        });

        res.send(data);
    } catch(error) {
        res.send(`BE error: ${error}`);
    }
};

const createVideo = async (req, res) => {
    try {
        let {video_name, thumbnail, desc, user_id, type_id} = req.body;
        let newData = {
            video_name,
            thumbnail,
            description: desc,
            user_id,
            type_id
        }
        // await conn.video.create(newData)

        // prisma
        await prisma.video.create({
            data: newData
        })
        res.send("Create video successfull");
    } catch(error) {
        res.send(`BE error: ${error}`)
    }
}

const deleteVideo = async (req, res) => {
    try {
        let {videoID} = req.params;
        await conn.video.destroy({
            where: {
                video_id: videoID,
            }
        });
        res.send("Delete video successfull!");
    } catch(error) {
        res.send(`BE error: ${error}`);
    }
}

const updateVideo = async (req, res) => {
    try {
        let {videoID} = req.params;
        let {video_name, thumnail, desc, user_id, type_id} = req.body;
        let updateData = {
            video_name,
            thumnail,
            description: desc,
            user_id,
            type_id
        }
        await conn.video.update((updateData), {
            where: {
                video_id: videoID
            }            
        });
        res.send("Update video successfull!");
    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

export {
    getVideo,
    createVideo,
    deleteVideo,
    updateVideo,
}