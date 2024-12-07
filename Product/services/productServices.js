const express = require("express");
const productModel = require("../models/productModel");

const app = express();

app.use(express.json());

const getProducts = async () => {
  const products = await productModel.find();
  return products;
};

const createProduct = async ({ name, description, price, quantity, category, imageUrl }) => {
  const product = new productModel({
    name,
    description,
    price,
    quantity,
    category,
    imageUrl, 
  });

  await product.save(); 
  return product;
};

const findProduct = async (id) => {
  const products = await productModel.findOne({ _id: id });
  return products;
};

module.exports = {
  getProducts,
  createProduct,
  findProduct,
};
