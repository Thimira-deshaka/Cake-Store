const express = require("express");
const productModel = require("../models/productModel");

const app = express();

app.use(express.json());

const getProducts = async () => {
  const products = await productModel.find();
  return products;
};

const createProduct = async (data) => {
  const product = await productModel.create(data);
  return product;
};

const findProduct = async (idOrName) => {
  const products = await productModel.findOne({
    $or: [{ name: idOrName }, { _id: idOrName }],
  });
  return products;
};

module.exports = {
  getProducts,
  createProduct,
  findProduct,
};
