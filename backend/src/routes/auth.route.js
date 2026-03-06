import express from "express";
import { LogIn } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", LogIn);

router.get("/signUp", (req, res) => {
  res.send("Sign up server");
});

router.get("/logout", (req, res) => {
  res.send("logout server");
});
export default router;
