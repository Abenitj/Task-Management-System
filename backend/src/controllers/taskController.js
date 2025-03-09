import { getIo, getUserSocketId } from "../config/socket.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import { createNotification } from "./notificationController.js";
// Create a new task
export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();

    if (savedTask) {
      const message = `You are assigned to the ${savedTask.title} task`;
      // Check if assignedTo exists before notifying
      if (savedTask.assignedTo) {
        try {
          await createNotification(savedTask.assignedTo, message);
        } catch (notificationError) {
          console.error(
            "Error creating notification:",
            notificationError.message
          );
          // You could also handle the notification error separately if needed
        }
      }
    }

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Server error:", error.message); // Log the server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project assignedTo reportedIssues")
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "project assignedTo reportedIssues"
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Update a task
export const updateTask = async (req, res) => {
  try {
    const { title, project, assignedTo, priority, status, deadline } = req.body;

    // Check if any of the required fields are missing
    if (!title || !project || !assignedTo || !status) {
      return res.status(400).json({
        error: "Fields title, project, assignedTo, and status are required.",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// patch status
export const patchStatus = async (req, res) => {
  try {
    //find and update
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    const project = await Project.findById(updatedTask.project);
    if (updatedTask.assignedTo) {
      const message = ` ${req?.body.firstname} ${req?.body.lastname} has changed the task status ${updatedTask.status} `;
      try {
        await createNotification(project?.createdBy, message);
      } catch (notificationError) {
        console.error(
          "Error creating notification:",
          notificationError.message
        );
      }
    }
    // const {project ,..updatedTaskWithoutProject} = updatedTask
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
