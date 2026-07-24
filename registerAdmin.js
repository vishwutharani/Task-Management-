require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const registerAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const adminData = {
      name: "Admin2",
      email: "vishwutharani53626+admin@gmail.com",
      password: await bcrypt.hash("admin456", 10),
      role: "admin",
    };

    const user = new User(adminData);
    await user.save();
    console.log("✅ Admin registered successfully!");
    console.log("📧 Email:", adminData.email);
    console.log("🔑 Password: admin456");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

registerAdmin();