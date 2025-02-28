import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Added password field
  status:{
    type:String,
    enum: ["Active", "Inactive"],
    default:"Active",
  },
  role: {
    type: String,
    enum: ["Admin", "Project Manager", "Team Member"],
    default: "Team Member"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
