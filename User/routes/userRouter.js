const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware")

const {getUser, getUsers, userRegister, loginUser} = require("../controllers/usercontroller")

// router.route("/").get( validateToken, getUsers)
const {forgotPassword,resetPassword,} = require("../controllers/recoverPasswordController");

router.route("/").post(userRegister)

router.route("/").get(validateToken, getUser)

router.route("/login").post(loginUser);
// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password").post(resetPassword);


module.exports = router
