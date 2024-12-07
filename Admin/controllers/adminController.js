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

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;

    console.log("Product Data:", { name, description, price, quantity, category });

    // Handle uploaded file (if any)
    const image = req.file ? req.file.buffer : null;
    const product = await adminService.addProduct(name, description, price, quantity, category, image); 
    res.status(200).json(product); 
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch order details." });
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


// const createAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const foundAdmin = await AdminModel.findOne({ email: email });
//   if (foundAdmin) {
//     res.status(400).json({ message: "admin already exists" });
//   } else {
//     const admin = await AdminModel.create({
//       email: email,
//       password: hashedPassword,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       phone: req.body.phone,
//     });

//     res.json(admin.id);
//   }
// };
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
  addProduct,
};
