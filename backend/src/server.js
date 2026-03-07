import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import path from "path";
import { connectToMongo } from "./config/db.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
const port = process.env.PORT;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectToMongo();
  console.log("the server is running on the port 5000");
});
