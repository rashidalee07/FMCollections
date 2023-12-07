const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router
  .route("/your-favorites")
  .get(authController.protect, userController.getFavorites);

// Takes product id and makes sure that user exists and logged in so user can add favorites
router
  .route("/favorites/:id")
  .post(authController.protect, userController.addToFavorites)
  .patch(authController.protect, userController.removeFromFavorites);
router.route("/cart").get(authController.protect, userController.getCartItems);

router
  .route("/cart/:id")
  .post(authController.protect, userController.addToCart)
  .patch(authController.protect, userController.removeFromCart);
router
  .route("/update-cart/:id")

  .patch(authController.protect, userController.updateCart);

module.exports = router;
