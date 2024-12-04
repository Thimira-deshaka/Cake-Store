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

// const checkout = async (req, res) => {
//     const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
//     // console.log(cartProducts);
//     let total = 0;
//     res.json({cartProducts});

// }
const checkoutCart = async (userId) => {
  try {
    // Fetch user's cart items
    const cartItems = await cartModel.find({ userId });

    if (!cartItems.length) {
      throw new Error("No items in the cart to checkout.");
    }

    // Create order history entries
    const orderHistoryEntries = cartItems.map((item) => ({
      userId: userId,
      productId: item.productId,
      quantity: item.quantity,
      
    }));

    // Insert the cart items into the orderHistory table
    await orderHistoryModel.insertMany(orderHistoryEntries);

    // Remove the items from the cart after successful checkout
    await cartModel.deleteMany({ userId });

    // Return the created order history as confirmation
    return orderHistoryEntries;
  } catch (error) {
    console.error("Error in checkoutCart service:", error);
    throw new Error("Failed to perform checkout.");
  }
};


module.exports = {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  checkoutCart,
};
