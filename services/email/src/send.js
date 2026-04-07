import express from "express";
import dotenv from "dotenv";
import { connectConsumer, connectToKafka } from "./servers/kafka.js";
import { run } from "./servers/sendEmail.js";

const app = express();
dotenv.config();
const port = process.env.PORT_EMAIL_SERVICE;

app.listen(async () => {
  await connectToKafka();
  await connectConsumer();
  run();
  console.log("The email service is running on port " + port);
});
