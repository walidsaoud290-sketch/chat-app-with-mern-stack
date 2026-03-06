import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cors from "cors"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log("the server is running on the port 3000");
});
