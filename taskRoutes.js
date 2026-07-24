const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");


const {
    assignTask,
    getEmployeeTasks,
    updateTaskStatus,
    getTaskStats,
    getAllTasks
} = require("../controllers/taskController");



// Admin Assign Task
router.post(
    "/assign",
    protect,
    isAdmin,
    assignTask
);


// Admin Dashboard Statistics
router.get(
    "/stats",
    protect,
    isAdmin,
    getTaskStats
);


// Admin View All Tasks
router.get(
    "/all",
    protect,
    isAdmin,
    getAllTasks
);



// Employee View Tasks
router.get(
    "/",
    protect,
    getEmployeeTasks
);



// Employee Update Status
router.put(
    "/:id",
    protect,
    updateTaskStatus
);



module.exports = router;