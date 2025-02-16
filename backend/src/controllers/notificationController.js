// import Notification from '../models/notificationModel.js';

// // Create and store the notification in the database
// export const createNotification = async (userId, message, io) => {
//   try {
//     // Create the notification in the database
//     const notification = new Notification({
//       userId,
//       message
//     });

//     // Save the notification to the database
//     await notification.save();

//     // Emit a real-time notification to the client
//     io.to(userId.toString()).emit('new-notification', { message });

//   } catch (error) {
//     console.error('Error creating notification:', error.message);
//   }
// };

