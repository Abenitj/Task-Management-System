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
      console.log(user);
    });
    // Remove user when they disconnect
    socket.on("disconnect", () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) delete users[userId];
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
