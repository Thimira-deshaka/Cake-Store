const userModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminService = require("../services/adminServices");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await adminService.loginAdmin(email, password);

    if (result && result.firstTimeLogin) {
      // Return a response indicating that the user needs to reset their password
      return res.status(200).json({ firstTimeLogin: true });
    }

    if (result) {
      res.status(200).json({ accessToken: result.accessToken, role: "admin" });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orders = await adminService.getOrderDetails(); 
    if(orders){
      return res.status(200).json(orders); 
    }
    return res.status(400).json({message : "No orders available"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch order details." });
  }
};

const resetPasswordAdminController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("Resetting password for:", email);

    // Call the service function to reset the password
    const result = await adminService.resetPasswordAdmin(email, newPassword);

    if (result.error) {
      return res.status(400).json({ message: result.error, details: result.details });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  // getUsers,
  // getUser,
  // createAdmin,
  loginAdmin,
  resetPasswordAdminController,
  getOrderDetails,
};
