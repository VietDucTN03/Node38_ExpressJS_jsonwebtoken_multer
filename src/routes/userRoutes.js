// define Router thì import express
import express from 'express';
import storage from '../controllers/uploadControllers.js';
import { uploadMultipleAvatar, uploadSingleAvatar } from '../controllers/userControllers.js';
import { checkToken, khoaAPI } from '../config/jwt.js';
import uploadCloud from '../config/cloudinary.config.js';

const userRoutes = express.Router();

// upload 1 file img
userRoutes.post("/upload-avatar", khoaAPI, uploadCloud.single("file"), uploadSingleAvatar);  // storage.single("file") là Key trong postman

// upload nhiều file imgs
userRoutes.post("/upload-multiple-avatar", khoaAPI, uploadCloud.array("files"), uploadMultipleAvatar);  // storage.array("files") là Key trong postman

export default userRoutes;
