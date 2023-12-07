const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (el) {
        // Only validate if confirmPassword is provided (truthy)
        return !this.isModified("password") || (el && el === this.password);
      },
      message: "Passwords do not match",
    },
  },

  favoriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Replace 'Product' with the actual name of your product model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1, // Set a default value if needed
      },
    },
  ],
  photo: String,
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  // This runs only if the password was modified
  if (!this.isModified("password")) next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  // FALSE mean not changed
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
