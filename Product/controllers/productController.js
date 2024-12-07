const productService = require("../services/productServices");
const express = require("express");
const productModel = require("../models/productModel");

const app = express();

app.use(express.json());

//Get All The Products
const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

// const getProductByName = async (req, res) => {
//   try {
//     const product = await productModel.find({ name: req.params.name });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const productDetails = await productModel.findById(req.params.id);
//     res.json(productDetails);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

//Filter Product by Key-Words
const findProduct = async (req, res) => {
  try {
    const product = await productService.findProduct(req.params.idOrName);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Create New Product(Not Checked Yet)
const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await productService.createProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getProducts,
  //   getProductByName,
  createProduct,
  //   getProductById,
  findProduct,
};
