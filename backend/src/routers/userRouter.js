import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  sendOTP,
  resetPassword,
  updateStatus,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/rbacMiddleware.js";
import { ROLES } from "../utils/constants.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id",authMiddleware,getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/send-otp", sendOTP);
router.patch("/reset-password", resetPassword);
router.patch("/status/:id",updateStatus);

export default router;
