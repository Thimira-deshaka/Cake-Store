const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  getUser,
  //   getUsers,
  userRegister,
  loginUser,
  updateUser,
} = require("../controllers/usercontroller");

// router.route("/").get( validateToken, getUsers)

router.route("/").post(userRegister);

router.route("/").get(validateToken, getUser);

router.route("/login").post(loginUser);

router.route("/update").put(validateToken, updateUser); 

module.exports = router;
