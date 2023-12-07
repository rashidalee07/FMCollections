const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  // imgUrl: String,
  available: {
    type: String,
    required: [true, "Product must be either in stock or sold out"],
    enum: {
      values: ["In Stock", "Sold out"],
      message: "Product must be either in stock or sold out",
    },
  },

  collectionSeason: {
    type: String,
    required: [true, "Product season must be Spring, Summer, Autumn or Winter"],
    enum: {
      values: ["Spring", "Summer", "Autumn", "Winter"],
      message: "Product season must be Spring, Summer, Autumn or Winter",
    },
  },
  coverImage: {
    type: String,
    // required: true,
  },

  collectionImages: [String],
  size: [String],
  productDescription: {
    type: String,
    trim: true,
    // required: true
  },

  // productDescription: {
  //   type: [String],
  //   validate: {
  //     validator: function (arr) {
  //       // Check if the array is not empty and contains at least one string
  //       return (
  //         arr && arr.length > 0 && arr.every((item) => typeof item === "string")
  //       );
  //     },
  //     message: "The product must contain design Description.",
  //   },
  //   required: true,
  // },
  slug: String,
  quantity: Number,
  colors: {
    type: [String],
    trim: true,
    // required: true,
    validate: {
      validator: function (arr) {
        // Check if the array is not empty and contains at least one string
        return (
          arr && arr.length > 0 && arr.every((item) => typeof item === "string")
        );
      },
      message: "The product must contain colors.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  //console.log('will save the document'),
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
