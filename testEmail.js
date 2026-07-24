require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

const testEmail = async () => {
  console.log("📧 Testing email send...");
  console.log("EMAIL:", process.env.EMAIL);
  console.log("PASSWORD length:", process.env.PASSWORD?.length);

  try {
    await sendEmail("vishwutharani53626+test@gmail.com", "Test from Task Manager", "Hello, this is a test.");
    console.log("✅ Test email sent successfully!");
  } catch (error) {
    console.error("❌ Test email failed:", error.message);
  }
};

testEmail();