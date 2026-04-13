import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectToMongo } from "./config/db.js";
import { connect_webSockets } from "./socket/socket.js";
import dataRoutes from "./routes/data.route.js";
import profileRoutes from "./routes/profiles.route.js";
import {
  ConnectProducer,
  connectToKafka,
  creatTopicMessages,
  deleteTopic,
  listTopics,
} from "./config/kafka.js";
import dataMessages from "./routes/messages.route.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/messages", dataMessages);
app.use("/api/profile", profileRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

await connectToKafka();
await ConnectProducer();
server.listen(PORT, async () => {
  connect_webSockets(server);
  connectToMongo();
  console.log("Server running on port", PORT);
});
