// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://bitchatapp.vercel.app/"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected with id: ", socket.id);

  //get authUser id from frontend socketContext
  const userId = socket.handshake.query.userId;
  userSocketMap[userId] = socket.id;

  //whenever user connects it will send who is online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  if (userId != undefined) {
  }

  // socket.on used to listen to events, both on client and server
  socket.on("disconnect", () => {
    console.log("User disconnected with id: ", socket.id);
    delete userSocketMap[userId];
    //whenever user goes offline it will send who is gone offilne
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
