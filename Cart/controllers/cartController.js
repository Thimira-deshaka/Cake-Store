const { json } = require("express");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const cartService = require("../services/cartServices");

const getCartProducts = async (req, res) => {
  const userId = req.user.id;
  const products = await cartService.getCartProducts(userId);
  if (products == "Cart is empty") {
    return res.json({ message: "Cart is empty" });
  }
  res.json({ Orders: products.productDetail, total: products.total });
};

const addCartProduct = async (req, res) => {
  try {
    const productID = req.params;
    // console.log(req.user.id, productID.productid);
    const cartProduct = await cartService.addCartProduct(
      req.user.id,
      productID.productid,
      req.user.quantity || 1
    );
    res.json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    const OrderID = req.params.orderid;
    console.log(OrderID);
    const cartProduct = await cartService.deleteCartProduct(OrderID);
    res.json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Need to modify
const checkout = async (req, res) => {
  const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
  // console.log(cartProducts);
  let total = 0;
  res.json({ cartProducts });
};

const checkoutCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Perform checkout process
    const orderHistory = await cartService.checkoutCart(userId);

    res.status(200).json({
      message: "Checkout successful",
      orderHistory,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  checkoutCart,
};
