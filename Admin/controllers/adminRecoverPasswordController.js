const adminService = require("../services/adminRecoverPasswordService");
const jwt = require("jsonwebtoken");

// Environment Variables
const EMAIL_SECRET = process.env.EMAIL_SECRET; // Replace with actual secret in environment
const FRONTEND_URL = process.env.FRONTEND_URL; // Frontend URL where user resets password

// Forgot Password (Send Reset Link to User's Email)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Generate token and send email
    const resetLink = await adminService.forgotPassword(email, EMAIL_SECRET, FRONTEND_URL);

    if (resetLink) {
      return res.status(200).json({ message: "Password reset link sent to email." });
    } else {
      return res.status(404).json({ message: "User not found with this email." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Input validation
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }

    // Reset the password
    const isPasswordReset = await adminService.resetPassword(token, newPassword, EMAIL_SECRET);

    if (isPasswordReset) {
      return res.status(200).json({ message: "Password updated successfully!" });
    } else {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
