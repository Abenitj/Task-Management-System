import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routers/userRouter.js";
import projectRoutes from "./src/routers/projectRoutes.js";
import taskRoutes from "./src/routers/taskRoutes.js";
import authRoutes from "./src/routers/authRoutes.js";
import issueRoutes from "./src/routers/issueRoutes.js";
import { initSocket } from "./src/utils/socket/socket.js";
import cookieParser from 'cookie-parser';
// Import the socket notification setup
// import { setupSocket } from './src/utils/socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
initSocket(server)
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend URL
    credentials: true, // Allow cookies
  })
);

app.use(cookieParser())

app.get("/",(req,res)=>{
  res.send("Server is up and running!")
})
// // Socket.IO Connection
// setupSocket(io);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/auth",authRoutes)

// Connect to MongoDB and start the server
connectDB().then(() => {
  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
