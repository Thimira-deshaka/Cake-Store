const { json } = require("express");
require("dotenv").config();
const cartItemModel = require("../models/cartItemModel");
const orderHistoryModel = require("../models/orderHistoryModel"); 
const axios = require("axios");

const getCartProducts = async (userId) => {
  const cartItems = await cartItemModel.find({ UserId: userId });
  //   console.log(cartItems[0]);
  if (cartItems.length === 0) {
    return "Cart is empty";
  }

  const enrichedCart = await Promise.all(
    cartItems.map(async (item) => {
      //   console.log(item);
      // Fetch product details from the Product Server
      const productResponse = await axios.get(
        `${process.env.PRODUCT_SERVER_BASE}/products/${item.ProductId}`
      );
      const product = productResponse.data;

      return {
        OrderId: item._id,
        productId: item.productId,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: item.quantity || 1, //have to modify
        total: product.price * item.quantity, // Calculate total for the item
      };
    })
  );
  const totalPrice = enrichedCart.reduce((sum, item) => sum + item.price, 0);
  //   console.log(totalPrice.toFixed(2));
  return { productDetail: enrichedCart, total: totalPrice.toFixed(2) };
};

const addCartProduct = async (userId, productId, qty) => {
  const cartProduct = await cartItemModel.create({
    UserId: userId,
    ProductId: productId,
    Quantity: qty,
  });
  return cartProduct;
};

const deleteCartProduct = async (OrderId) => {
  const cartProduct = await cartItemModel.findOneAndDelete({
    _id: OrderId,
  });
  return cartProduct;
};


const getOrderHistory = async () => {
  console.log("hello");
  const orders = await orderHistoryModel.find();
  console.log(orders);
  return orders;
};


// const checkout = async (req, res) => {
//     const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
//     // console.log(cartProducts);
//     let total = 0;
//     res.json({cartProducts});

// }
/**
 * Proceed to checkout for a specific cart item.
 */
const proceedToOrder = async (userId, itemId) => {
  try {
    // Find the cart item
    const cartItem = await cartItemModel.findOneAndDelete({
      _id: itemId,
      UserId: userId,
    });

    if (!cartItem) {
      throw new Error("Cart item not found.");
    }

    // Create an order history entry for the cart item
    const orderHistoryEntry = await orderHistoryModel.create({
      UserId: cartItem.UserId,
      ProductId: cartItem.ProductId,
      Quantity: cartItem.Quantity,
    });

    return {
      message: "Item successfully moved to order history.",
      orderHistoryEntry,
    };
  } catch (error) {
    console.error("Error in proceedToOrder service:", error);
    throw new Error("Failed to proceed order.");
  }
};


module.exports = {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  proceedToOrder,
  getOrderHistory,
};
