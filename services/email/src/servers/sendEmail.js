import nodemailer from "nodemailer";
import { consumer } from "./kafka.js";

export const run = async () => {
  await consumer.subscribe({
    topic: "email-successful",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Le Topic est :" + topic);
      console.log("Avec des partitions :" + partition);
      console.log("message reçu est :" + message.value.toString());
    },
  });
};
