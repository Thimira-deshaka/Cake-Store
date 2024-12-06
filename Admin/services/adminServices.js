const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAdmin = async (email, password) => {
  const user = await adminModel.findOne({ email });
  
  if (user && user.isFirstTimeLogin) {
    // If it's the first time, return a flag indicating a password reset is needed
    return { firstTimeLogin: true };
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: "admin",
        },
      },
      process.env.ACCESS_TOKEN
    );

    return { accessToken, firstTimeLogin: false };
  }
  return null;
};

const resetPasswordAdmin = async (email, newPassword) => {
  try {
    // Find the admin by email
    const user = await adminModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return { error: "User not found" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and set passwordResetRequired to false
    user.password = hashedPassword;
    user.isFirstTimeLogin = false;  // Mark the first-time login as done

    // Save the updated user
    await user.save();

    return { message: "Password reset successfully" };
  } catch (error) {
    return { error: "Internal Server Error", details: error.message };
  }
};

module.exports = {
  loginAdmin,
  resetPasswordAdmin,
};
