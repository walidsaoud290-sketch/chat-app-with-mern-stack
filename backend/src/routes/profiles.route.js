import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { Update } from "../controller/profile.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/update", verifyToken, upload.single("image"), Update);

export default router;
