const { json } = require("express");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const cartService = require("../services/cartServices");

const getCartProducts = async (req, res) => {
  const userId = req.user.id;
  const products = await cartService.getCartProducts(userId);
  // const cartProducts = await CartModel.find({ UserId: req.user.id });
  // const cartProductIds = [];
  // let total = 0;
  // cartProducts.forEach(cartProduct => {
  //     cartProductIds.push(cartProduct.ProductId);
  // });

  // console.log(cartProductIds);
  const Products = await ProductModel.find({ _id: { $in: cartProductIds } });
  Products.forEach((product) => {
    total += product.price;
  });
  // console.log(Products);

  // const productDetails = productArray.push(await ProductModel.findById(cartProducts[0].ProductId));
  // res.json(productDetails);
  res.json({ Products, total });
};

const addCartProduct = async (req, res) => {
  try {
    const cartProduct = await cartService.addCartProduct(
      orderDetails.id,
      orderDetails.productid,
      orderDetails.quantity || 1
    );
    res.json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartProduct = async (req, res) => {
  const cartProduct = await CartModel.findOneAndDelete({
    UserId: req.user.id,
    ProductId: req.params.productid,
  });
  res.json(cartProduct);
};

const checkout = async (req, res) => {
  const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
  // console.log(cartProducts);
  let total = 0;
  res.json({ cartProducts });
};

module.exports = {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  checkout,
};
