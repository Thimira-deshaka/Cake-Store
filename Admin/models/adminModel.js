const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },

    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    isFirstTimeLogin: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", userSchema);
