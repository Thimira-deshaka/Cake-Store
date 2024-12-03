const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    ProductId: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
