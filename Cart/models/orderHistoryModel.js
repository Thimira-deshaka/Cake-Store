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
// const Cart = require("./cartItemModel");
// //const OrderHistory = require("./orderHistoryModel");

// // Watch for delete operations in the Cart collection
// Cart.watch([{ $match: { operationType: "delete" } }], { fullDocument: "updateLookup" })
//   .on("change", async (change) => {
//     const { UserId, ProductId, Quantity } = change.fullDocument;

//     // Move to order history
//     await OrderHistory.create({ UserId, ProductId, Quantity });
//     console.log(`Item moved to OrderHistory: UserId=${UserId}, ProductId=${ProductId}`);
//   });



module.exports = mongoose.model("OrderHistory", orderHistorySchema);
