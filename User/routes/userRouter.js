const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  //getUser,
  userRegister,
  loginUser,
} = require("../controllers/usercontroller");


const {
  forgotPassword,
  resetPassword,
} = require("../controllers/recoverPasswordController");

//not validate
// router.route("/").get( validateToken, getUsers)

// Register User
router.route("/").post(userRegister);

// Get User (Protected Route)
router.route("/").get(validateToken);

// Login User
router.route("/login").post(loginUser);

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password").post(resetPassword);

module.exports = router;
