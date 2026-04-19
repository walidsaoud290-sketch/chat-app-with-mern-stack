import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { insert_messages } from "../functions/messages/insertMessages.js";
import cloudinary from "../config/cloudinary.js";
import { producer } from "../config/kafka.js";
import User from "../models/User.js";

// npm i socket.io (webSocket)
const app = express();
app.use(cors());
app.use(express.json());

let messages = [];
let onlineUsers = new Map();
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
    socket.on("join_room", async (userId) => {
      socket.join(userId);
      socket.userId = userId;
      onlineUsers.set(userId, socket.id);
      await User.findByIdAndUpdate(userId, {
        status: "online",
      });
    });

    socket.on("send_message", async (data) => {
      messages.push(data);
      const user = await User.findById(data.send_by)
        .select("-password")
        .select("-_id");
      console.log(user);
      const messageDB = {
        type: "text",
        senderId: data.send_by,
        receiverId: data.send_to,
        user: user,
        message: data.content,
        dateTime: new Date(),
      };

      await producer.send({
        topic: "notification-successful",
        messages: [{ value: JSON.stringify(messageDB) }],
      });
      await insert_messages(data.send_by, data.send_to, data.content);
      socket.emit("receive_message", messageDB);
      io.to(data.send_to).emit("receive_message", messageDB);
    });

    socket.on("send_image", async (data) => {
      try {
        const result = await cloudinary.uploader.upload(data.message, {
          folder: "chat_images",
        });
        const message = {
          type: "image",
          message: result.secure_url,
          senderId: data.send_by,
          receiverId: data.send_to,
          dateTime: new Date(),
        };
        messages.push(message);
        await insert_messages(
          message.senderId,
          message.receiverId,
          message.message,
        );
        await producer.send({
          topic: "notification-successful",
          messages: [{ value: JSON.stringify(message) }],
        });
        socket.emit("receive_image", message);
        io.to(message.receiverId).emit("receive_image", message);
      } catch (error) {
        throw Error("Error uploading image :" + error);
      }
    });

    // disconnection
    socket.on("disconnect", async () => {
      const userId = socket.userId;
      if (!userId) return;
      onlineUsers.delete(userId);

      await User.findByIdAndUpdate(userId, {
        lastSeen: new Date(),
        status: "offline",
      });

      io.emit("user_status", {
        userId,
        status: "offline",
        lastSeen: new Date(),
      });

      console.log("User disconnected:", socket.id);
    });

    return io;
  });
};
