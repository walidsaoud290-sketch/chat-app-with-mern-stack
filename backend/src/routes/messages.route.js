import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  get_messages,
} from "../controller/messages.controller.js";

const router = express.Router();

router.post("/getMessages", verifyToken, get_messages);

export default router;
