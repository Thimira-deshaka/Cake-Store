const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Environment variables
const EMAIL_SECRET = process.env.EMAIL_SECRET; // Secret key for signing JWT
const FRONTEND_URL = process.env.FRONTEND_URL; // URL for frontend password reset page

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service (e.g., Gmail)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
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
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) return null;

    // Generate a JWT token for password reset
    const token = jwt.sign({ id: user._id }, EMAIL_SECRET, { expiresIn: "1h" });

    // Create reset link
   const resetLink = `${FRONTEND_URL}/Forgetpassword?token=${token}`;

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    // Send the email
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
    // Verify the reset token
    const decoded = jwt.verify(token, EMAIL_SECRET);

    // Find the user by ID
    const user = await userModel.findById(decoded.id);
    if (!user) return false;

    // Hash the new password and update it
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

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