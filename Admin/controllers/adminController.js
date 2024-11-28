const userModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5m" }
    );
    res.status(200).json(accessToken);
    //   console.log(accessToken);
  } else {
    res.status(401).json({ message: "Wrong email or password" });
  }
  res.json({ message: "admin logged in" });
};

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const foundAdmin = await AdminModel.findOne({ email: email });
  if (foundAdmin) {
    res.status(400).json({ message: "admin already exists" });
  } else {
    const admin = await AdminModel.create({
      email: email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    });

    res.json(admin.id);
  }
};

module.exports = {
  // getUsers,
  // getUser,
  createAdmin,
  loginAdmin,
};
