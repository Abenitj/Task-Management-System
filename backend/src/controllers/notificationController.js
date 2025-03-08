// controllers/notificationController.js
import { getIo, getUserSocketId } from "../config/socket.js";
import Notification from "../models/notificationModel.js";

export const createNotification = async (userId, message) => {
  try {
    // Create the notification object
    const newNotification = new Notification({
      userId,
      message,
    });
    // Save to the database
    await newNotification.save();
    // hanlde notification
    if (newNotification) {
      const notifications = await Notification.find({ userId, isRead: false });
      const socketId = getUserSocketId(userId);
      getIo().to(socketId).emit("notification", notifications);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error creating notification");
  }
};

// Fetch notifications (with req/res for API endpoints)
export const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId, isRead: false }).sort({createdAt:-1});
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

export const MarkAsRead = async (req, res) => {
  const {notification_id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(
      notification_id, // Use notification_id instead of userId
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Successfully marked as read", notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Error marking notification as read" });
  }
};
