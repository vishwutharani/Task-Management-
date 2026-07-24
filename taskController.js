const Task = require("../models/Task");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");


// Assign Task (Admin)
const assignTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      assignedTo
    } = req.body;


    const employee = await User.findById(assignedTo);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }


    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      assignedBy: req.user._id
    });


    await sendEmail(
      employee.email,
      "New Task Assigned",
      `Hello ${employee.name},

You have been assigned a new task.

Title: ${title}
Description: ${description}
Priority: ${priority}

Please complete it on time.`
    );


    res.status(201).json({
      message: "Task Assigned Successfully",
      task
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// Employee View Tasks
const getEmployeeTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      assignedTo: req.user._id
    })
    .populate("assignedBy", "name email");


    res.status(200).json(tasks);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// Update Task Status
const updateTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;


    const task = await Task.findById(req.params.id)
      .populate("assignedBy", "name email")
      .populate("assignedTo", "name email");


    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }


    task.status = status;

    await task.save();



    await sendEmail(
      task.assignedBy.email,
      "Task Status Updated",
      `Employee ${task.assignedTo.name} updated task "${task.title}" status to ${status}.`
    );


    res.status(200).json({
      message: "Task status updated successfully",
      task
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Dashboard Statistics
const getTaskStats = async (req, res) => {

  try {

    const notStarted = await Task.countDocuments({
      status: "Not Started"
    });


    const pending = await Task.countDocuments({
      status: "Pending"
    });


    const completed = await Task.countDocuments({
      status: "Completed"
    });



    res.status(200).json({
      notStarted,
      pending,
      completed
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Admin View All Tasks + Search + Pagination
const getAllTasks = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";


    const query = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    };


    const totalTasks = await Task.countDocuments(query);


    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email")
      .skip((page - 1) * limit)
      .limit(limit);


    res.status(200).json({
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      tasks
    });


  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};



module.exports = {
  assignTask,
  getEmployeeTasks,
  updateTaskStatus,
  getTaskStats,
  getAllTasks
};