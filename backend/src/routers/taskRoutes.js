import express from 'express';
import { 
  createTask, 
  getAllTasks, 
  getTaskById, 
  updateTask, 
  deleteTask, 
} from '../controllers/taskController.js';

const router = express.Router();

// Task routes
router.post('/', createTask);  // Create a new task
router.get('/', getAllTasks);  // Get all tasks
router.get('/:id', getTaskById);  // Get a task by ID
router.put('/:id', updateTask);  // Update a task
router.delete('/:id', deleteTask);  // Delete a task// Assign or reassign a task to a user

export default router;
