const Project = require("../src/models/project.model");

const createproject=async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;
console.log("User ID:", userId);
    const project = new Project({
      title,
      description,
      user: userId,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateProject = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description, status } = req.body;
console.log(req.body);

    const project = await Project.findOneAndUpdate(
      { _id: id, user: req.user._id }, 
      { title, description, status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    const project = await Project.findOneAndDelete({ _id: id, user: req.user._id });

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createproject,
  getAllProjects,
  updateProject,
  deleteProject 
       
};