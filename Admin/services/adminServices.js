const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAdmin = async (email, password) => {
  const user = await adminModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: "admin",
        },
      },
      process.env.ACCESS_TOKEN
      // { expiresIn: "5m" }
    );

    return accessToken;
  }
  return null;
};

module.exports = {
  // getUsers,
  // getUser,
  // createAdmin,
  loginAdmin,
};
