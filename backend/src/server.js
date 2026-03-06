import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log("the server is running on the port 3000");
});
