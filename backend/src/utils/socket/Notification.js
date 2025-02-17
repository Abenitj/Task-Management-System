import Notification from "../../models/notificationModel.js";

export const handleNotificationEvents = (socket, io) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    // Send message to all clients
    socket.broadcast.emit("recieved", data);
  });
  // When a user connects, send their unread notifications
  socket.on("get_notifications", async (userId) => {
    const notifications = await Notification.find({ userId, isRead: false });
    socket.emit("notifications_list", notifications);
  });

  // Mark notifications as read
  socket.on("mark_as_read", async (notificationId) => {
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
  });
};
