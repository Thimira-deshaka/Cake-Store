const userService = require("../services/userServices");
// require("dotenv").config();

// const getUsers = async (req, res) => {
//     // const allusers = await userModel.find();
//     res.json(req.user)
// }

// Get Personal Infor from Each User
const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (user) {
      return res.json(user);
    }
    res
      .status(500)
      .json({ message: "Internal Server Error! Please contact help center." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error! Please contact help center." });
  }
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
      res.status(200).json({ accessToken: accessToken, role: "customer" });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
      const users = await userService.getAllUsers();
      if (!users) {
          return res.status(404).json({ message: "No users found." });
      }
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userID } = req.params; // Extract userID from the request parameters
    const user = await userService.getUserById(userID); // Fetch user details
    if (user) {
      return res.status(200).json(user); // Return user details
    } else {
      return res.status(404).json({ message: "User not found." }); // Handle user not found
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user details", error: error.message }); // Handle server error
  }
};


module.exports = {
  // getUsers,
  getUser,
  userRegister,
  loginUser,
  getAllUsers,
  getUserById,
};
