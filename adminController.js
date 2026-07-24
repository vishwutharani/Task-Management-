const User = require("../models/User");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: "employee",
    }).select("-password");

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getEmployees,
};