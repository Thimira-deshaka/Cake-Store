const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  loginAdmin,
  resetPasswordAdminController,
  getOrderDetails,
  logoutAdmin,
} = require("../controllers/adminController");

const {
  resetPassword,
  forgotPassword,
} = require("../controllers/adminRecoverPasswordController");

router.route("/login").post(loginAdmin);

router.route("/logout").post(validateToken, logoutAdmin);

router.route("/orders").get(validateToken, getOrderDetails);

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password").post(resetPassword);

router.route("/reset-password-Admin").post(resetPasswordAdminController);

module.exports = router;
