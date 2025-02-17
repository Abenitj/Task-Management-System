import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import Notification from '../models/notificationModel.js'; 
import { getIO } from '../utils/socket/socket.js';
// import { io } from '../../app.js'; 
// import { notifyTaskAssigned } from '../utils/notification.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, project, assignedTo, priority, status, deadline } = req.body;

    // Check if any of the required fields are missing
    if (!title || !project || !assignedTo || !status) {
      return res.status(400).json({ error: 'Fields title, project, assignedTo, and status are required.' });
    }

    const task = new Task(req.body);
    const savedTask = await task.save();
    const io=getIO();
    // Notify task assigned
    const user = await User.findById(assignedTo);
    if (user) {
      io.emit('task',savedTask)
    }
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('project assignedTo reportedIssues');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project assignedTo reportedIssues');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { title, project, assignedTo, priority, status, deadline } = req.body;

    // Check if any of the required fields are missing
    if (!title || !project || !assignedTo || !status) {
      return res.status(400).json({ error: 'Fields title, project, assignedTo, and status are required.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
