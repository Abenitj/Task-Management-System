// // notification.js
// import Notification  from '../models/notificationModel.js'; // Your Notification Schema
// // import  {io}  from '../../app.js'; // Assuming you already have the io instance

// // Emit notification to a specific user
// export const sendNotification = async (userId, message) => {
//   try {
//     // Create a new notification in MongoDB
//     const notification = new Notification({

//       userId: userId,
//       message: message,
//     });

//     await notification.save(); // Save the notification to MongoDB

//     // Find the user's socketId
//     const recipientSocketId = users[userId];
    
//     if (recipientSocketId) {
//       // Emit notification in real-time if the user is online
//       io.to(recipientSocketId).emit("receiveNotification", { message: notification.message });
//       console.log(`Notification sent to user ${userId}: ${message}`);
//     } else {
//       console.log(`User ${userId} is offline, but notification saved.`);
//     }

//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };

// // Example use case: Task status change notification
// export const notifyTaskStatusChange = async (taskData) => {
//   const { userId, taskTitle, status } = taskData;
//   const message = `Task '${taskTitle}' status changed to: ${status}`;

//   await sendNotification(userId, message);
// };

// // Example use case: Task assignment notification
// export const notifyTaskAssigned = async (taskData) => {
//   const { userId, taskTitle } = taskData;
//   const message = `You have been assigned a new task: ${taskTitle}`;

//   await sendNotification(userId, message);
// };

