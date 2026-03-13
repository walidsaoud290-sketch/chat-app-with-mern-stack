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
    return io;
  });
};

//
const connection_to_webSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "url_frontend",
      methods: ["GET"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected :" + socket.id);

    // Si il y a des messages
    socket.on("send_message", (data) => {
      messages.push(data);
      io.emit("receive_message", data);
    });

    // Si il y a des images

    socket.on("send_image", (data) => {
      messages.push(data);
      io.emit("receiva_image");
    });

    socket.disconnect("disconnect", () => {
      console.log("User disconnected :" + socket.id);
    });
  });
};
