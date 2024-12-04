const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  checkoutCart, 
} = require("../controllers/cartController");
const validateToken = require("../middleware/tokenValidationMiddleware");

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.post("/:productid", validateToken, addCartProduct);


router.post("/checkout", validateToken, checkoutCart);

router.delete("/:orderid", validateToken, deleteCartProduct);

module.exports = router;
