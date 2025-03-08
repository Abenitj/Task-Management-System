import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Blocked"],
      default: "To Do",
    },
    deadline: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > new Date(); // Ensures deadline is in the future
        },
        message: "Deadline must be a future date.",
      },
    },
    reportedIssues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

export default mongoose.model("Task", taskSchema);
