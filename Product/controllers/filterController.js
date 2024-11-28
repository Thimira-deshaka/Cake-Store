const productModel = require("../models/productModel");
const filterService = require("../services/filterServices");

// (Not Checked Yet)
const categoryFilter = async (req, res) => {
  try {
    const filteredProducts = await filterService.categoryFilter(
      req.params.idOrName
    );
    res.status(200).json({ filteredProducts });
  } catch (error) {
    res.status(400).json(error);
  }
};

//(Not Checked Yet)
const priceFilter = async (req, res) => {
  try {
    const filteredProducts = await filterService.priceFilter(
      req.params.idOrName
    );
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// (Not Checked Yet)
const categorypriceFilter = async (req, res) => {
  try {
    const filteredProducts = await filterService.categorypriceFilter(
      req.params.category,
      req.params.price
    );
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  categoryFilter,
  priceFilter,
  categorypriceFilter,
};
