const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMyTasks, updateTaskStatus } = require("../controllers/employeeController");

// Employee: view own tasks
router.get("/tasks", protect, getMyTasks);

// Employee: update task status
router.put("/tasks/:id", protect, updateTaskStatus);

module.exports = router;