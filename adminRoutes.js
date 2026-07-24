const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const { getEmployees } = require("../controllers/adminController");

console.log("protect:", protect);
console.log("isAdmin:", isAdmin);
console.log("getEmployees:", getEmployees);

router.get("/employees", protect, isAdmin, getEmployees);

module.exports = router;