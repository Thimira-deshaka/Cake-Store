const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenValidationMiddleware");

const {
  getUser,
  getAllUsers,
  getUserById,
  //   getUsers,
  userRegister,
  loginUser,
} = require("../controllers/usercontroller");

// router.route("/").get( validateToken, getUsers)

router.route("/").post(userRegister);

router.route("/").get(validateToken, getUser);

router.route("/login").post(loginUser);

router.route("/all").get(getAllUsers);

router.route("/all/:userID").get(getUserById);


module.exports = router;
