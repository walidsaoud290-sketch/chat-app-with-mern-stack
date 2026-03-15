import express from "express";
import { get_limit_users, get_users } from "../controller/data.controller.js";
import {
  verifyAdmin,
  verifyRefreshToken,
  verifyToken,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, get_users);
router.get("/users_amies", verifyToken, get_limit_users);
export default router;
