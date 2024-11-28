const userService = require("../services/userServices");

const userModel = require("../models/userModel");
require("dotenv").config();

// const getUsers = async (req, res) => {
//     // const allusers = await userModel.find();
//     res.json(req.user)
// }

const getUser = async (req, res) => {
  const user = await userModel.findById(req.user.id, { password: 0 });
  // console.log(req.user.id);
  res.json(user);
  // res.json({message: `information of user with id ${req.params.id}`})
};

const userRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, age, phone, gender } =
      req.body;

    // Input validation
    if (!firstName || !lastName || !email || !password || !age || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newUser = await userService.userRegister({
      email,
      password,
      firstName,
      lastName,
      age,
      phone,
      gender,
    });

    if (newUser) {
      res.json(newUser.id);
    } else {
      res.status(400).json({ message: "user already exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error! Please contact help center." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const accessToken = await userService.loginUser(email, password);

    if (accessToken) {
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  // getUsers,
  getUser,
  userRegister,
  loginUser,
};
