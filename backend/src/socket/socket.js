import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { Kafka } from "kafkajs";
import { InsertionData } from "../utils/insertion.js";

// npm i socket.io (webSocket)
const app = express();
app.use(cors());
app.use(express.json());

let messages = [];
const kafka = new Kafka({
  clientId: "send_message",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

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
      InsertionData(data);
      io.emit("receive_message", data);
    });

    // image
    socket.on("send_image", (data) => {
      messages.push(data);
      InsertionData(data);
      console.log(data);
      io.emit("receive_image", data);
    });

    // disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    return io;
  });
};
