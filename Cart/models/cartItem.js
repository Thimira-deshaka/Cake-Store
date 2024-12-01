const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
