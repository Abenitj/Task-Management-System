import Project from "../models/projectModel.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, createdBy, startDateTime, endDateTime } = req.body;

    // Check if any of the required fields are missing
    if (!name || !createdBy || !startDateTime || !endDateTime) {
      return res
        .status(400)
        .json({
          message:
            "All fields (name, createdBy, startDateTime, endDateTime) are required.",
        });
    }

    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (message) {
    res
      .status(500)
      .json({ message: "Server message", message: message.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy tasks")
      .sort({ _id: -1 });
    res.status(200).json(projects);
  } catch (message) {
    res
      .status(500)
      .json({ message: "Server message", message: message.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "createdBy tasks"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (message) {
    res
      .status(500)
      .json({ message: "Server message", message: message.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { name, createdBy, startDateTime, endDateTime } = req.body;

    // Check if any of the required fields are missing
    if (!name || !createdBy || !startDateTime || !endDateTime) {
      return res
        .status(400)
        .json({
          message:
            "All fields (name, createdBy, startDateTime, endDateTime) are required.",
        });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (message) {
    res
      .status(500)
      .json({ message: "Server message", message: message.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (message) {
    res
      .status(500)
      .json({ message: "Server message", message: message.message });
  }
};
