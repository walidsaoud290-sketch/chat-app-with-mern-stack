import express from "express";
import { return_data } from "../controller/data.controller.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", return_data);

export default router;
