const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema(
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
// Create the OrderHistory model
const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

// Import the cart model
const Cart = require("./cartItemModel");

// Watch for delete operations in the Cart collection
Cart.watch([{ $match: { operationType: "delete" } }]).on("change", async (change) => {
  try {
    const cartItem = change.documentKey; // Get deleted document's _id
    const deletedItem = await Cart.findById(cartItem._id);

    if (deletedItem) {
      // Insert the deleted item into the OrderHistory collection
      await OrderHistory.create({
        UserId: deletedItem.UserId,
        ProductId: deletedItem.ProductId,
        Quantity: deletedItem.Quantity,
      });
      console.log("Item moved to order history:", deletedItem);
    }
  } catch (error) {
    console.error("Error handling cart change stream:", error);
  }
});

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
