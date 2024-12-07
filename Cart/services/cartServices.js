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
  console.log(userId, productId, qty);
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


const getOrderHistory = async (id) => {
  const orders = await orderHistoryModel.find({UserId: id});

  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
        const productResponse = await axios.get(
          `${process.env.PRODUCT_SERVER_BASE}/products/${order.ProductId}`
        );

        // Add product details to the order
        const product = productResponse.data;
        return {
          id: order._id,
          productId: order.ProductId,
          productName: product.name,
          productImage: product.image,
          date: order.createdAt, 
          quantity: order.Quantity,
          price: product.price,
          status: order.status, 
        };
    })
  )
  // console.log(orders);
  // return enrichedOrders;
};

const getAllOrderHistory = async () => {
  const orders = await orderHistoryModel.find();

  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
        const productResponse = await axios.get(
          `${process.env.PRODUCT_SERVER_BASE}/products/${order.ProductId}`
        );
        const userResponse = await axios.get(
          `${process.env.USER_SERVER_BASE}/users/${order.UserId}`
        );
        const user = userResponse.data;

        // Add product details to the order
        const product = productResponse.data;
        return {
          id: order._id,
          productId: order.ProductId,
          productName: product.name,
          productImage: product.image,
          date: order.createdAt, 
          quantity: order.Quantity,
          price: product.price,
          status: order.Status,
          customerName: user.firstName + " " + user.lastName, 
        };
    })
  )
  // console.log(enrichedOrders);
  return enrichedOrders;
};

const updateStatus = async (OrderId, newStatus) => {
  const updatedOrder = await orderHistoryModel.findByIdAndUpdate(
    OrderId,
    { Status: newStatus },
    { new: true } // Return the updated document
  );
  return updatedOrder;
}


// const checkout = async (req, res) => {
//     const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
//     // console.log(cartProducts);
//     let total = 0;
//     res.json({cartProducts});

// }
/**
 * Proceed to checkout for a specific cart item.
 */
const proceedToOrder = async (userId) => {
    const cartItems = await cartItemModel.find({ UserId: userId }); 

    if (!cartItems || cartItems.length === 0) {
      throw new Error("No cart items found for the user.");
    }

    //Save all deleted cart items to the order history
    const orderHistoryEntries = cartItems.map((cartItem) => ({
      UserId: cartItem.UserId,
      ProductId: cartItem.ProductId,
      Quantity: cartItem.Quantity,
      Status: "Accepted",
    }));

    await orderHistoryModel.insertMany(orderHistoryEntries);

    //Delete all cart items for the user
    await cartItemModel.deleteMany({ UserId: userId });
    return {
      message: "Item successfully moved to order history.",
      cartItems,
    };
};


module.exports = {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  proceedToOrder,
  getOrderHistory,
  getAllOrderHistory,
  updateStatus,
};
