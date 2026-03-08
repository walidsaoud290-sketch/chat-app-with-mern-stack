import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.route.js";
import { connectToMongo } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

// creation un serveur webSocket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let messages = [];


io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // message texte
  socket.on("send_message", (data) => {

    messages.push(data);
    
    io.emit("receive_message", data);

  });

  // image
  socket.on("send_image", (data) => {

    messages.push(data);

    io.emit("receive_image", data);

  });

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id);

  });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {

  await connectToMongo();

  console.log("Server running on port", PORT);

});