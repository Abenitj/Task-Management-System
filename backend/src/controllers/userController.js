import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getIo, getUserSocketId } from "../config/socket.js";

dotenv.config();

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ _id: -1 }); // Excluding password
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
     const {role}=req.params;
     try {
      const users= await User.find({role}).select('-password')
       if(!users){
        res.status(404).json({message: 'User not found'})
       }
       res.status(200).json(users)
     } catch (error) {
      res.status(500).json({message:"internal server error", error:error.message})
     }
};


// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Excluding password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const socketId= getUserSocketId(req.params.id)

    if(!socketId){
      return res.status(404).json({ message: "User not connected" });
    }
    getIo().to(socketId).emit('user',"this is message from server");
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Create new user
export const createUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // ✅ 1. Validate input fields
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // ✅ 2. Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // ✅ 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ 4. Create and save the user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // ✅ 5. Send response (excluding password for security)
    res.status(201).json({
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      message: "User created successfully",
    });
  } catch (error) {
    // ✅ 6. Handle any errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// Update user
export const updateUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Simple validation checks
  if (!firstname || !lastname || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, password, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Exclude password before sending the response
    res.status(200).json({ ...updatedUser.toObject(), password: undefined });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "status not found" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.status(200).json({ message: "status updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "internal server error " });
  }
};
// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const otpStore = new Map(); // Temporary storage (use Redis in production)
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
    });

    // Store OTP with expiration time (5 minutes)
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // Send OTP via email
    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <p>Your OTP for password reset is: <strong>${otp}</strong>. It is valid for <strong >5 minutes</strong>.</p>
      `,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate OTP
    const storedOtpData = otpStore.get(email);
    if (
      !storedOtpData ||
      storedOtpData.otp !== otp ||
      storedOtpData.expiresAt < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Remove OTP from store
    otpStore.delete(email);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
