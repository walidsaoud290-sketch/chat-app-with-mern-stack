import { Server } from "socket.io";
import cors from "cors";
import express from "express";

// npm i socket.io (webSocket)
const app = express();
app.use(cors());
app.use(express.json());

let messages = [];

export const connect_webSockets = (server) => {
  // creation un serveur webSocket
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // message texte
    socket.on("send_message", (data) => {
      messages.push(data);
      console.log(data);
      io.emit("receive_message", data);
    });
    
    // image
    socket.on("send_image", (data) => {
      messages.push(data);
      console.log(data);
      io.emit("receive_image", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
    return io;
  });
};
