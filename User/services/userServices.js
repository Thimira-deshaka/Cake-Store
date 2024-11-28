const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRegister = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const foundUser = await userModel.findOne({ email: userData.email });
    if (foundUser) {
      return false;
    } else {
      const user = await userModel.create({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        phone: userData.phone,
        gender: userData.gender,
      });
      return user;
    }
  } catch (error) {
    throw new Error("Error occur when add user");
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            phone: user.phone,
            gender: user.gender,
            role: "customer",
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "5m" }
      );

      return accessToken;
    }
    return null;
  } catch (error) {
    throw new Error("Error occur when creating token");
  }
};

const getUser = async (userId) => {
  try {
    const user = await userModel.findById(userId, { password: 0 });
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  userRegister,
  loginUser,
  getUser,
};
