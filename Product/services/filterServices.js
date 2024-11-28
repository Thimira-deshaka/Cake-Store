const productModel = require("../models/productModel");

const categoryFilter = async (category) => {
  // console.log(req.params);
  const filteredProducts = await productModel.find({ category: category });
  return filteredProducts;
};

const priceFilter = async (price) => {
  const filteredProducts = await productModel.find({ price: { $lte: price } });
  return filteredProducts;
};

const categorypriceFilter = async (category, price) => {
  const filteredProducts = await productModel.find({
    category: category,
    price: { $lte: price },
  });
  return filteredProducts;
};

module.exports = {
  categoryFilter,
  priceFilter,
  categorypriceFilter,
};
