import io, { Server } from "socket.io";
import http from "http";
import cors from "cors"
import express from "express"

const app = express()
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})


let message = [];
io.on("connection",(socket)=>{
    console.log()
})