// const userModel = require('../models/userModel');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const loginUser = async (req, res) => {
  // const { email, password } = req.body;
  // const user = await userModel.findOne({ email });
  // if (user && (await bcrypt.compare(password, user.password))) {
  //   const accessToken = jwt.sign(
  //     {
  //       user: {
  //         email: user.email,
  //         id: user._id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         age: user.age,
  //         phone: user.phone,
  //         gender: user.gender
  //       },
  //     },
  //     process.env.ACCESS_TOKEN,
  //     { expiresIn: "5m" }
  //   );
  //   res.status(200).json(accessToken);
  //   console.log(accessToken);
  // } else {
  //   res.status(401).json({ message: "Wrong email or password" });
  // }
  // // res.json({message: "user logged in" })
};

module.exports = {
  // getUsers,
  // getUser,
  // userRegister,
  loginUser,
};
