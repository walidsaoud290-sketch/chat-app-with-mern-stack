import express from "express";
import { LogIn, signUp } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", LogIn);

router.post("/signUp", signUp);

router.post("/logout", (req, res) => {
  res.send("logout server");
});
export default router;
