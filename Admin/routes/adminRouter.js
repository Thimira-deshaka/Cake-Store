const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  getUser,
  getUsers,
  createAdmin,
  loginAdmin,
} = require("../controllers/adminController");

const {
  resetPassword,
  forgotPassword,
} = require("../controllers/adminRecoverPasswordController");
// router.route("/").get( validateToken, getUsers)

router.route("/").post(createAdmin);

// router.route("/").get(validateToken, getUser)

router.route("/login").post(loginAdmin);

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password").post(resetPassword);

module.exports = router;
