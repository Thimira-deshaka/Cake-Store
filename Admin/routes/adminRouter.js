const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  getUser,
  getUsers,
  createAdmin,
  loginAdmin,
  resetPasswordAdminController,
  getOrderDetails,
  addProduct,
} = require("../controllers/adminController");

const {
  resetPassword,
  forgotPassword,
} = require("../controllers/adminRecoverPasswordController");

const multer = require("multer");

// Configure Multer for memory storage
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

// router.route("/").post(createAdmin)

// router.route("/").get(validateToken, getUser)addproduct

router.route("/addproduct").post(upload.single("image"), addProduct);

router.route("/login").post(loginAdmin);

router.route("/orders").get(validateToken, getOrderDetails);

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password").post(resetPassword);

router.route("/reset-password-Admin").post(resetPasswordAdminController);

module.exports = router;
