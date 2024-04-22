import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3003",
        methods : ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSockerMap[receiverId];
}

const userSockerMap = {}

io.on("connection", (socket)=> {
    console.log("A user connected", socket.id)
    const userId = socket.handshake.query.userId;
    if(userId != "undefined"){
        userSockerMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSockerMap))

    socket.on("disconnect", ()=> {
        console.log("A user disconnected", socket.id)
        delete userSockerMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSockerMap))
    })
})

export { app , server , io};