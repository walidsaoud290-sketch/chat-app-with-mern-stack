import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/auth.route.js";
import { connectToMongo } from "./config/db.js";
import { connect_webSockets } from "./socket/socket.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

connect_webSockets(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await connectToMongo();
  console.log("Server running on port", PORT);
});
