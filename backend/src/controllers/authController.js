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
      httpOnly: true,
      secure: false,            // must be false for HTTP (local frontend)
      sameSite: 'Lax',          // or 'None' if needed for cross-site (e.g. localhost → render)
      maxAge: 12 * 60 * 60 * 1000
    });
    

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstname: user.firstname,
        lastname:user.lastname,
        status:user.status
        // Add any other non-sensitive user data here
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
