import express from "express"
import {getNotifications, MarkAsRead } from "../controllers/notificationController.js"

const router= express.Router()

router.get("/:userId", getNotifications);
router.put("/:notification_id",MarkAsRead)

export default router;