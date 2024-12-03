const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  checkout,
} = require("../controllers/cartController");
const validateToken = require("../middleware/tokenValidationMiddleware");

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.post("/:productid", validateToken, addCartProduct);

// need to modify
router.delete("/checkout", validateToken, checkout);

router.delete("/:orderid", validateToken, deleteCartProduct);

module.exports = router;
