const Project = require("../src/models/project.model");
const Task = require("../src/models/task.model");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate,projectId  } = req.body;
   
    const findProject = await Project.findById(projectId);
    if (!findProject) {
      return res.status(404).json({ message: "Project not found" });    
    }

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      project: projectId,
    });

    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks for a project (with optional status filter)
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.body;
    const { status } = req.query;

    const query = { project: projectId };
    if (status) query.status = status;

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
  
    const { _id,title, description, status, dueDate,project } = req.body;
console.log(req.body);
    const task = await Task.findOneAndUpdate(
      { _id:_id, project: project },
      { title, description, status, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    console.log(req.params,"//////////");
    
    const { taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
