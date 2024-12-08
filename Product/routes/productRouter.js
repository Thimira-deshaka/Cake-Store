const express = require("express");
const AdminTokenValidate = require("../middleware/admintokenValidationMiddleware");
const productController = require("../controllers/productController");
const router = express.Router();

//For upload docs
const multer = require("multer");
// Importing the file system module for directory creation
const fs = require("fs");
//For upload docs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = `./public`;

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });;

router.get("/", productController.getProducts);

router.get("/:idOrName", productController.findProduct);

router.post("/", AdminTokenValidate, upload.single("image"), productController.createProduct);

router.put("/:id", AdminTokenValidate, productController.updateProduct);

router.delete("/:id", AdminTokenValidate, productController.deleteProduct);

module.exports = router;
