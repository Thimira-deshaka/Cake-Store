const productService = require("../services/productServices");
const express = require("express");
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

//Create New Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 

    const product = await productService.createProduct({
      name,
      description,
      price,
      quantity,
      category,
      imageUrl,
    });
    res.status(201).json(product);
    console.log(imageUrl);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getProducts,
  //   getProductByName,
  createProduct,
  //   getProductById,
  findProduct,
};
