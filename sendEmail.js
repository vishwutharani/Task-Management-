const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }
  return transporter;
};

const sendEmail = async (to, subject, text) => {
  try {
    const trans = getTransporter();
    const info = await trans.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;