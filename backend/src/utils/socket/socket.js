import { Server } from "socket.io";
import { handleNotificationEvents } from "./Notification.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Update this if your frontend runs on a different port
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    handleNotificationEvents(socket,io)

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
