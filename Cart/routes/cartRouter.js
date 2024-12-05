const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  proceedItemToOrder, 
} = require("../controllers/cartController");
const validateToken = require("../middleware/tokenValidationMiddleware");

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.post("/:productid", validateToken, addCartProduct);


router.post("/cart/proceed/:itemId", validateToken, proceedItemToOrder);

router.delete("/:orderid", validateToken, deleteCartProduct);

module.exports = router;
