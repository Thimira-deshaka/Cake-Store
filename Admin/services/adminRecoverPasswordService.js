const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


const EMAIL_SECRET = process.env.EMAIL_SECRET; 
const FRONTEND_URL = process.env.FRONTEND_URL; 

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

/**
 * Sends a password reset link to the user's email.
 * @param {string} email - The email of the user requesting a password reset.
 * @returns {string|null} - The reset link if successful, or null if user not found.
 */
const forgotPassword = async (email, EMAIL_SECRET, FRONTEND_URL) => {
  try {
    console.log("Received email:", email);
    const admin = await adminModel.findOne({ email });
    if (!admin) return null;
    const token = jwt.sign({ id: admin._id }, EMAIL_SECRET, { expiresIn: "1h" });
    const resetLink = `${FRONTEND_URL}/AdminResetPassword?token=${token}`;

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    };

   
    await transporter.sendMail(mailOptions);

    return resetLink;
  } catch (error) {
    console.error("Error in forgotPassword service:", error);
    return null;
  }
};

/**
 * Resets the user's password using the token.
 * @param {string} token - The reset token provided by the user.
 * @param {string} newPassword - The new password provided by the user.
 * @returns {boolean} - True if password reset is successful, false otherwise.
 */
const resetPassword = async (token, newPassword) => {
  try {
   
    const decoded = jwt.verify(token, EMAIL_SECRET);
    const admin = await adminModel.findById(decoded.id);
    if (!admin) return false;
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return true;
  } catch (error) {
    console.error("Error in resetPassword service:", error);
    return false;
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
