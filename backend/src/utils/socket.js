// // socket.js
// import { sendNotification } from './notification.js'; // Import the notification methods

// let users = {}; // Store connected users

// export const setupSocket = (io) => {
//   io.on("connection", (socket) => {
//     console.log(`A user connected: ${socket.id}`);

//     // Register user when they provide their userId (e.g., during login)
//     socket.on("register", (userId) => {
//       users[userId] = socket.id;
//       console.log(`User registered -> userId: ${userId}, socketId: ${socket.id}`);
//     });

//     // Handle task creation and notification on task assignment
//     socket.on("assignTask", (taskData) => {
//       const { assignedUserId, taskTitle } = taskData;
      
//       // Send real-time notification about task assignment
//       sendNotification(assignedUserId, `You have been assigned a new task: ${taskTitle}`);
//       console.log(`Task assigned to user ${assignedUserId}: ${taskTitle}`);
//     });

//     // Handle task status change and notification
//     socket.on("taskStatusChange", (taskData) => {
//       const { assignedUserId, taskTitle, status } = taskData;

//       // Send real-time notification about task status change
//       sendNotification(assignedUserId, `Task '${taskTitle}' status changed to: ${status}`);
//       console.log(`Task status changed for user ${assignedUserId}: ${taskTitle} -> ${status}`);
//     });

//     // Handle user disconnect
//     socket.on("disconnect", () => {
//       Object.keys(users).forEach((key) => {
//         if (users[key] === socket.id) delete users[key];
//       });
//       console.log(`User disconnected: ${socket.id}`);
//     });
//   });
// };
