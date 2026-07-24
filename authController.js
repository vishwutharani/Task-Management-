const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("📝 Register attempt:", email);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    console.log("✅ User registered:", email);
    res.status(201).json({
      message: "User Registered Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("❌ Register error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  console.log("🔐 Login attempt:", req.body.email);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid Password" });
    }

    console.log("✅ User authenticated:", email, "Role:", user.role);

    // ✅ Send notification if employee
    if (user.role === "employee") {
      const adminEmail = process.env.ADMIN_EMAIL || "vishwutharani53626+admin@gmail.com";
      console.log("📧 Sending notification to admin:", adminEmail);
      const subject = "🔔 Employee Login Notification";
      const text = `
Hello Admin,

${user.name} (${user.email}) just logged in at ${new Date().toLocaleString()}.

Regards,
Task Management System
      `;

      try {
        await sendEmail(adminEmail, subject, text);
        console.log("✅ Notification sent to", adminEmail);
      } catch (err) {
        console.error("❌ Email failed:", err.message);
      }
    } else {
      console.log("ℹ️ User is not an employee – no notification sent.");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };