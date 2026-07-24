const Task = require("../models/Task");

// Get all tasks assigned to the logged‑in employee
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate("assignedBy", "name email")
      .populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update status of a task (only if it belongs to the employee)
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure the task belongs to the logged‑in employee
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyTasks,
  updateTaskStatus,
};