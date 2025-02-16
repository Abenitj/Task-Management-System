import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  sendOTP,
  resetPassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/rbacMiddleware.js";
import { ROLES } from "../utils/constants.js";
const router = express.Router();

router.get("/", authMiddleware, authorizeRoles(ROLES.ADMIN), getAllUsers);
router.get("/:id",authMiddleware,getUserById);
router.post("/", authMiddleware, authorizeRoles(ROLES.ADMIN), createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, authorizeRoles(ROLES.ADMIN), deleteUser);
router.post("/send-otp", authMiddleware, sendOTP);
router.patch("/reset-password", authMiddleware, resetPassword);

export default router;
