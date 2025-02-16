import express from 'express';
import { createIssue, getAllIssues, getIssueById, updateIssue, deleteIssue } from '../controllers/issueController.js';

const router = express.Router();

// Issue routes
router.post('/', createIssue);  // Create a new issue
router.get('/', getAllIssues);  // Get all issues
router.get('/:id', getIssueById);  // Get issue by ID
router.put('/:id', updateIssue);  // Update an issue
router.delete('/:id', deleteIssue);  // Delete an issue

export default router;
