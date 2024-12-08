const express = require("express");
const productModel = require("../models/productModel");

const app = express();

app.use(express.json());

const getProducts = async () => {
  const products = await productModel.find();
  return products;
};

const createProduct = async (productData) => {
  // console.log(productData);
  const product = await productModel.create(productData);
    return product; 
};

const findProduct = async (id) => {
  const products = await productModel.findOne({ _id: id });
  return products;
};

const updateProduct = async (productId, productData) => {
    const updatedProduct = await productModel.findByIdAndUpdate(
      {_id: productId},
      { $set: productData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct;
};

const deleteProduct = async (productId) => {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    return deletedProduct;
  }

module.exports = {
  getProducts,
  createProduct,
  findProduct,
  updateProduct,
  deleteProduct,
};
