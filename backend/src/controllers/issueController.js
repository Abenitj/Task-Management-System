import Issue from '../models/issueModel.js';

// Create a new issue
export const createIssue = async (req, res) => {
  try {
    const { taskId, reportedBy, description, status } = req.body;

    // Validate required fields
    if (!taskId || !reportedBy || !description) {
      return res.status(400).json({ error: 'Task ID, ReportedBy, and Description are required.' });
    }

    const issue = new Issue({
      taskId,
      reportedBy,
      description,
      status: status || 'Open',  // Default to Open if status is not provided
    });

    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('taskId reportedBy');
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('taskId reportedBy');
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an issue
export const updateIssue = async (req, res) => {
  try {
    const { status, description } = req.body;

    // Validate if either status or description is provided for update
    if (!status && !description) {
      return res.status(400).json({ error: 'Either status or description is required to update.' });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status, description },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an issue
export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
