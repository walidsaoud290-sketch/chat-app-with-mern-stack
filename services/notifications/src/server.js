import express from "express";
import dotenv from "dotenv";
import http from "http";
import { connectionConsumer, connectionToKafka } from "./config/kafka.js";
import { connect_web_sockets } from "./sockets/socket.js";

dotenv.config();

const app = express();
const port = process.env.PORT_NOTIFICATIONS || 7000;

const server = http.createServer(app);

await connectionToKafka();
await connectionConsumer();

await connect_web_sockets(server);

server.listen(port, () => {
  console.log("The server notification is running on port :", port);
});
