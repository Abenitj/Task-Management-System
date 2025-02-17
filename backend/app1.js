// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./src/config/db.js";
// import userRoutes from "./src/routers/userRouter.js";
// import projectRoutes from "./src/routers/projectRoutes.js";
// import taskRoutes from "./src/routers/taskRoutes.js";
// import issueRoutes from "./src/routers/issueRoutes.js";

// // Import the socket notification setup
// // import { setupSocket } from './src/utils/socket.js';
// import { Socket } from "dgram";

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Update this if your frontend runs on a different port
//     methods: ["GET", "POST"]
//   }
// });
// app.get("/",(req,res)=>{
//   res.send("Server is up and running!")
// })
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("message", (data) => {
//     console.log("Message received:", data);
//     io.emit("message", data); // Send message to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// // // Socket.IO Connection
// // setupSocket(io);

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/task", taskRoutes);
// app.use("/api/issue", issueRoutes);

// // Connect to MongoDB and start the server
// connectDB().then(() => {
//   server.listen(port, () => {
//     console.log(`🚀 Server running at http://localhost:${port}`);
//   });
// });
