const User = require("./../models/userModel");
const Product = require("./../models/productModel");
const Cart = require("./../models/cartModel");

exports.addToFavorites = async (req, res, next) => {
  const productId = req.params.id;
  // console.log(req.params);
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    // console.log("From user controller", userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    // console.log("From user controller product", product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (user.favoriteProducts.includes(productId)) {
      return res.status(400).json({ error: "Product already favorited" });
    }

    user.favoriteProducts.push(productId);

    await user.save();

    res.json({ message: "Product favorited successfully" });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFavorites = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .populate("favoriteProducts")
    .select("favoriteProducts");
  // console.log(user);
  try {
    if (user) {
      //   const updatedProducts = products.map((item) => {
      //     const updatedItem = { ...item }; // Create a new object or clone the existing one
      //     updatedItem.price = numeral(item.price).format("0,0"); // Update the price field
      //     console.log("Updated item:", updatedItem); // Log the item after modification

      //     return updatedItem; // Return the modified object
      //   });
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
    next();
  } catch (error) {}
};

exports.removeFromFavorites = async (req, res, next) => {
  const productId = req.params.id;
  // console.log(req.params);
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    // console.log("From user controller", userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    console.log("From delete controller product", product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (user.favoriteProducts.includes(productId)) {
      await User.updateOne(
        { _id: userId },
        { $pull: { favoriteProducts: productId } }
      );
      res.status(200).json({
        status: "success",
        msg: "Removed successfully",
      });
    }
    next();
  } catch (error) {}
};

exports.getCartItems = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Assuming your User model has a method to populate cart items
    const user = await User.findById(userId).populate("cartItems.product");

    if (!user) {
      return res.status(404).json({ status: "fail", msg: "User not found" });
    }

    const cartItems = user.cartItems.map((item) => ({
      product: item.product, // Assuming you want to include the entire product information
      quantity: item.quantity,
    }));
    console.log(cartItems);
    return res.status(200).json({ status: "success", data: cartItems });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  } finally {
    next(); // Call the next middleware function
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    console.log("userId:", userId);
    console.log("productId:", productId);

    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    const cartItems = user.cartItems;
    console.log("cartUser:", cartItems);

    // Find the index of the product in the cartItems array
    const productIndex = cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    // If the product is already in the cart, increment the quantity
    if (productIndex !== -1) {
      cartItems[productIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    // Save the modified user document
    await user.save();

    return res.status(200).json({
      status: "success",
      msg: "Added to cart successfully",
      data: user.cartItems,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  } finally {
    next(); // Call the next middleware function
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const user = await User.findById(userId);
    let cartItems = user.cartItems;

    // Check if the product is in the cart
    const productIndex = cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
      // Product is in the cart

      // Remove the product from the cartItems array
      cartItems.splice(productIndex, 1);

      // Save the modified user document
      await user.save();

      return res.status(200).json({
        status: "success",
        msg: "Removed from cart successfully",
        data: user.cartItems,
      });
    } else {
      return res
        .status(404)
        .json({ status: "fail", msg: "Product not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  } finally {
    next();
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const { action, quantity } = req.body; // Assuming you send { action: "increment" or "decrement", quantity: 1 } from the frontend

    const user = await User.findById(userId);
    let cartItems = user.cartItems;

    // Find the index of the product in the cartItems array
    const productIndex = cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
    // const productIndex = cartItems.findIndex((item) => {
    //   console.log(action, quantity);
    //   item === productId;
    // });
    console.log("here i am", productIndex);
    if (productIndex !== -1) {
      // Product is in the cart
      console.log("here i am");
      if (action === "increment") {
        // Increment quantity
        cartItems[productIndex].quantity += 1;
      } else if (action === "decrement") {
        // Decrement quantity, ensuring it doesn't go below 1
        cartItems[productIndex].quantity = Math.max(
          1,
          cartItems[productIndex].quantity - (quantity || 1)
        );
      } else {
        // Handle other actions or invalid actions
        return res.status(400).json({ status: "fail", msg: "Invalid action" });
      }

      // Save the modified user document
      await user.save();

      return res.status(200).json({
        status: "success",
        msg: "Cart updated successfully",
        data: user.cartItems[productIndex],
      });
    } else {
      return res
        .status(404)
        .json({ status: "fail", msg: "Product not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  } finally {
    next();
  }
};
