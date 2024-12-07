const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  getUser,
  userRegister,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserById,
  logoutUser,
} = require("../controllers/usercontroller");


const {
  forgotPassword,
  resetPassword,
} = require("../controllers/recoverPasswordController");

// Register User
router.route("/").post(userRegister);

// Get User (Protected Route)
router.route("/").get(validateToken, getUser);

// Login User
router.route("/login").post(loginUser);

// Logout User
router.route("/logout").post(validateToken, logoutUser);

//Update user
router.route("/update").put(validateToken, updateUser); 

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password").post(resetPassword);

//get all users
router.route("/all").get(getAllUsers);


router.route("/all/:userID").get(getUserById);

// Update a user by ID
router.route("/update/:userId").put(updateUserById);

router.route("/:userID").get(getUserById);



module.exports = router;
