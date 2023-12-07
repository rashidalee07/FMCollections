const express = require("express");

const router = express.Router();

const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(authController.protect, productController.getAllProducts)
  .post(
    authController.protect,
    productController.uploadProductImage,
    productController.resizeProductImage,
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
