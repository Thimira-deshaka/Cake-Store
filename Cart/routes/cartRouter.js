const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  proceedItemToOrder, 
  getOrderHistoryController,
} = require("../controllers/cartController");
const validateToken = require("../middleware/tokenValidationMiddleware");

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.post("/:productid", validateToken, addCartProduct);


router.post("/proceed/:itemId", validateToken, proceedItemToOrder);

router.get("/order-history", getOrderHistoryController);

router.delete("/:orderid", validateToken, deleteCartProduct);

module.exports = router;
