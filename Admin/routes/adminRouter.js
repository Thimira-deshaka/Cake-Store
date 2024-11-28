const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  getUser,
  getUsers,
  createAdmin,
  loginAdmin,
} = require("../controllers/adminController");

// router.route("/").get( validateToken, getUsers)

router.route("/").post(createAdmin);

// router.route("/").get(validateToken, getUser)

router.route("/login").post(loginAdmin);

module.exports = router;
