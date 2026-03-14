import express from "express";
import { LogIn, logout, signUp } from "../controller/auth.controller.js";
import { limiter } from "../rateLimiting/limiting.js";

const router = express.Router();

router.post("/login", limiter, LogIn);

router.post("/signUp", signUp);

router.post("/logout",logout);
export default router;
