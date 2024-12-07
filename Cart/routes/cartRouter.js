const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  proceedItemToOrder,
  getOrderHistory, 
} = require("../controllers/cartController");
const validateToken = require("../middleware/tokenValidationMiddleware");

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.get("/history", getOrderHistory);

router.post("/:productid", validateToken, addCartProduct);


router.post("/proceed/:itemId", validateToken, proceedItemToOrder);

router.delete("/:orderid", validateToken, deleteCartProduct);

module.exports = router;
