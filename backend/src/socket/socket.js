import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { insert_messages } from "../functions/messages/insertMessages.js";

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

    socket.on("send_message", (data) => {
      messages.push(data);
      const messageDB = {
        senderId: data.send_by,
        receiverId: data.send_to,
        message: data.content,
        dateTime: new Date(),
      };
      insert_messages(data.send_by, data.send_to, data.content);

      io.emit("receive_message", messageDB);
    });

    socket.on("send_image", (data) => {
      messages.push(data);
      insert_messages(data.send_by, data.send_to, data.content);
      io.emit("receive_image", data);
    });

    // disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    return io;
  });
};
