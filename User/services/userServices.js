const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRegister = async (userData) => {
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
};

const loginUser = async (email, password) => {
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
      // { expiresIn: "5m" }
    );

    return accessToken;
  }
  return null;
};

const getUser = async (userId) => {
  const user = await userModel.findById(userId, { password: 0 });
  return user;
};


const getAllUsers = async () => {
  try {
      const users = await userModel.find(); // Fetch all users from the database
      return users;
  } catch (error) {
      throw new Error("Failed to fetch users from database");
  }
};

const getUserById = async (userID) => {
  try {
    const user = await userModel.findById(userID, { password: 0 }); // Exclude password
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user from database");
  }
};

const updateUser = async (userId, userData) => {  
  const user = await userModel.findByIdAndUpdate
  (userId, userData, { new: true });
  return user;
}

const updateUserById = async (userId, userData) => {
  try {
    // Find user by ID and update
    const updatedUser = await userModel.findByIdAndUpdate(userId, userData, {
      new: true, // Return the updated document
      runValidators: true, // Validate data before updating
    });

    return updatedUser;
  } catch (error) {
    console.error("Error in updateUserById service:", error);
    throw new Error("Failed to update user in database");
  }
};



module.exports = {
  userRegister,
  loginUser,
  getUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserById,
};
