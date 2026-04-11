import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { insert_messages } from "../functions/messages/insertMessages.js";
import cloudinary from "../config/cloudinary.js";

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

  io.on("connection",(socket)=>{
    socket.on("join_room",(userId)=>{
      socket.join(userId);
      console.log("User joined room :"+userId)
    })
  })

  io.on("connection", (socket) => {
    console.log("hhe");
    console.log("User connected:", socket.id);

    socket.on("send_message", async (data) => {
      messages.push(data);
      const messageDB = {
        type: "text",
        senderId: data.send_by,
        receiverId: data.send_to,
        message: data.content,
        dateTime: new Date(),
      };
      await insert_messages(data.send_by, data.send_to, data.content);
      socket.emit("receive_message", messageDB);
      io.to(messageDB.receiverId).emit("receive_message", messageDB);
    });
    

    socket.on("send_image", async (data) => {
      try {
        const result = await cloudinary.uploader.upload(data.content, {
          folder: "chat_images",
        });
        const message = {
          type: "image",
          content: result.secure_url,
          senderId: data.send_by,
          receiverId: data.send_to,
          dateTime: new Date(),
        };
        messages.push(message);
        await insert_messages(
          message.senderId,
          message.receiverId,
          message.content,
        );
        socket.emit("receive_image", message);
        io.to(message.receiverId).emit("receive_image", message);
      } catch (error) {
        throw Error("Error uploading image :" + error);
      }
    });

    // disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    return io;
  });
};
