const { json } = require("express");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
require("dotenv").config();
const cartItem = require("../models/cartItem");

const getCartProducts = async (userId) => {
  const cartItems = await cartItem.find({ userId });
  if (cartItems.length === 0) {
    return res.status(404).json({ message: "Cart is empty" });
  }

  const enrichedCart = await Promise.all(
    cartItems.map(async (item) => {
      // Fetch product details from the Product Server
      const productResponse = await axios.get(
        `${process.env.PRODUCT_SERVER_BASE}/${item.productId}`
      );
      const product = productResponse.data;

      return {
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: product.price * item.quantity, // Calculate total for the item
      };
    })
  );

  //   const cartProducts = await CartModel.find({ UserId: userId });
  //   const cartProductIds = [];
  //   let total = 0;
  //   cartProducts.forEach((cartProduct) => {
  //     cartProductIds.push(cartProduct.ProductId);
  //   });

  //   // console.log(cartProductIds);
  //   const Products = await ProductModel.find({ _id: { $in: cartProductIds } });
  //   Products.forEach((product) => {
  //     total += product.price;
  //   });
  // console.log(Products);

  // const productDetails = productArray.push(await ProductModel.findById(cartProducts[0].ProductId));
  // res.json(productDetails);
  //   res.json({ Products, total });
};

const addCartProduct = async (userId, productId, qty) => {
  const cartProduct = await CartModel.create({
    UserId: userId,
    ProductId: productId,
    quantity: qty,
  });
};

// const deleteCartProduct = async (req, res) => {
//     const cartProduct = await CartModel.findOneAndDelete(
//         {
//             UserId: req.user.id,
//             ProductId: req.params.productid
//         }
//     );
//     res.json(cartProduct);
// }

// const checkout = async (req, res) => {
//     const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
//     // console.log(cartProducts);
//     let total = 0;
//     res.json({cartProducts});

// }

module.exports = {
  getCartProducts,
  addCartProduct,
  //   deleteCartProduct,
  //   checkout,
};
