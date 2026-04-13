import { Server } from "socket.io";
import { consumer } from "../config/kafka.js";
import User from "../../../../backend/src/models/User.js";

export const connect_web_sockets = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    console.log("Notification user connected:", socket.id);

    socket.on("join_room_notifications", (userId) => {
      if (userId) {
        socket.join(userId);
        socket.emit("notification_room_joined", { userId, status: "success" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Notification user disconnected:", socket.id);
    });
  });

  if (!consumer) {
    console.error("Kafka consumer not initialized");
    return;
  }

  await consumer.subscribe({
    topic: "notification-successful",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message, topic, partition }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log("Kafka message received:", data);
        
        // Emit to the specific user's room
        if (data.receiverId) {
          io.to(data.receiverId).emit("send_notification", data);
          console.log(`Notification sent to user ${data.receiverId}`);
        }
      } catch (error) {
        console.error("Error processing Kafka message:", error);
      }
    },
  });

  console.log("Notification socket server ready");
  return io;
};
