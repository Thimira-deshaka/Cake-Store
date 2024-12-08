const express = require("express");const multer = require("multer");
const path = require("path");
const fs = require("fs");
const productController = require("../controllers/productController");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads");
  
      // Check if the directory exists; if not, create it
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
  
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}`;
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage });

router.get("/", productController.getProducts);

router.get("/:idOrName", productController.findProduct);

router.post("/", upload.single("image"), productController.createProduct);

module.exports = router;
