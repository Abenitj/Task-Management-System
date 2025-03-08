import { Server } from "socket.io";

let io;
const user = {};
export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  // Socket.IO Connection
  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      user[userId] = socket.id;
      console.log("user registered",user);
    });
    // Remove user when they disconnect
    socket.on("disconnect", () => {
      const userId = Object.keys(user).find((key) => user[key] === socket.id);
      if (userId) delete user[userId];
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIo = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

export const getUserSocketId = (userId) => {
  return user[userId];
};
