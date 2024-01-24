import express from "express";
import { createVideo, deleteVideo, getVideo, updateVideo } from "../controllers/videoControllers.js";
import { khoaAPI } from "../config/jwt.js";

const videoRoutes = express.Router();

videoRoutes.get("/get-video/:page/:size", khoaAPI, getVideo);  // define API get-video có method là GET
videoRoutes.post("/create-video", createVideo);
videoRoutes.delete("/delete-video/:videoID", deleteVideo);
videoRoutes.put("/update-video/:videoID", updateVideo);

export default videoRoutes;