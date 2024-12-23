const userModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminService = require("../services/adminServices");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const accessToken = await adminService.loginAdmin(email, password);

    if (accessToken) {
      res.status(200).json({ accessToken: accessToken, role: "customer" });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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

module.exports = {
  // getUsers,
  // getUser,
  // createAdmin,
  loginAdmin,
};
