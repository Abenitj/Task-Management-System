import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('❌ Missing MONGODB_URI environment variable.');
    process.exit(1); // Exit if DB URI is missing
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    // Log more details in development or with more structured info
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ MongoDB Connection Error:", error.message);
      console.error(error.stack); // Detailed stack trace in dev
    } else {
      console.error("❌ MongoDB Connection Error:", error.message);
      // Optionally, you could log this error to a file or monitoring service in production
    }
    process.exit(1); // Exit on connection failure
  }
};

export default connectDB;
