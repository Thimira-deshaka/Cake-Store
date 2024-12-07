const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  proceedItemToOrder,
  getOrderHistory, 
  getAllOrderHistory,
  updateStatus,
} = require("../controllers/cartController");
const validateToken = require("../middleware/tokenValidationMiddleware");
const validateAdminToken = require("../middleware//admintokenValidationMiddleware");

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.get("/history", validateToken, getOrderHistory);

router.get("/orders", validateAdminToken, getAllOrderHistory);

router.put("/orders/status", validateAdminToken, updateStatus);

router.post("/:productid", validateToken, addCartProduct);


router.delete("/checkout", validateToken, proceedItemToOrder);

router.delete("/:orderid", validateToken, deleteCartProduct);

module.exports = router;
