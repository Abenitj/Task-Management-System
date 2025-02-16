import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import {ROLES} from "../utils/constants.js" 
const router = express.Router();

// Create a new project
router.post('/',authMiddleware,authorizeRoles(ROLES.PROJECT_MANAGER),createProject);
// Get all projects
router.get('/',authMiddleware,authorizeRoles(ROLES.PROJECT_MANAGER),getAllProjects);
// Get a project by ID
router.get('/:id',authMiddleware,getProjectById);
// Update a project
router.put('/:id',authMiddleware,authorizeRoles(ROLES.PROJECT_MANAGER), updateProject);
// Delete a project
router.delete('/:id',authMiddleware,authorizeRoles(ROLES.PROJECT_MANAGER), deleteProject);

export default router;
