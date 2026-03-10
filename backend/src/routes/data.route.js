import express from "express";
import { return_data } from "../controller/data.controller.js";

const router = express.Router();

router.get("/users", return_data);

export default router;
