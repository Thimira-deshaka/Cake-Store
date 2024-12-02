const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  //getUser,
  userRegister,
  loginUser,
  //forgotPassword,
 // resetPassword,
} = require("../controllers/usercontroller");

 HEAD
const {
  //getUser,
  //userRegister,
  //loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/recoverPasswordController");

//not validate
// router.route("/").get( validateToken, getUsers)
 db694a6833ef43a6e5913a7a7460a50abafc347

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
