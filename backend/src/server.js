import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/auth.route.js";
import { connectToMongo } from "./config/db.js";
import { connect_webSockets } from "./socket/socket.js";
import dataRoutes from "./routes/data.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

const server = http.createServer(app);

connect_webSockets(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  connectToMongo();
  console.log("Server running on port", PORT);
});
