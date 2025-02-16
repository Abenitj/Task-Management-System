import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import User from '../models/userModel.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, role: user.role }, // Include role
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );
      
    // Set the token in an HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,  // Secure, prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Uses HTTPS in production
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
      sameSite: 'Strict', // CSRF protection
    });

    res.json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
