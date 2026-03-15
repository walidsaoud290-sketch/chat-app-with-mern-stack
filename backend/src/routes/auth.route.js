import express from "express";
import { LogIn, logout, signUp } from "../controller/auth.controller.js";
import { limiter } from "../rateLimiting/limiting.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", limiter, LogIn);

router.post("/signUp", limiter, signUp);

router.post("/logout", logout);

router.get("/verify", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Authenticated",
    user: req.userData,
  });
});
export default router;
