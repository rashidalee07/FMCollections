const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const numeral = require("numeral");
const Product = require("./../models/productModel");

// const tours = JSON.parse(
// fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
// );

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     const extension = file.mimetype.split("/")[1];
//     cb(null, `aj-${Date.now()}.${extension}`);
//   },
// });

const multerStorage = multer.memoryStorage(); // Keeps image in buffer

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not image file please upload image file", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// exports.uploadProductImage = upload.single("coverImage");
exports.uploadProductImage = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "collectionImages", maxCount: 6 },
]);
// exports.resizeProductImage = (req, res, next) => {
//   if (!req.file) return next();
//   req.file.filename = `aj-${Date.now()}.jpeg`;
//   sharp(req.file.buffer)
//     .resize(333, 488, { fit: "cover" })
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/images/${req.file.filename}`);
//   next();
// };

exports.resizeProductImage = async (req, res, next) => {
  // if (!req.file) return next();
  console.log("We are about to cover image");

  // console(req.file.)

  if (!req.files.coverImage || !req.files.collectionImages) return next();

  // req.file.filename = `aj-${Date.now()}.jpeg`;

  // Image Cover
  req.body.coverImage = `aj-${Date.now()}-cover.jpeg`;
  await sharp(req.files.coverImage[0].buffer)
    .resize(333, 488, { fit: "cover" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/${req.body.coverImage}`);
  console.log(req.body);
  // Collection Images
  req.body.collectionImages = [];
  await Promise.all(
    req.files.collectionImages.map(async (file, i) => {
      const filename = `aj-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(333, 488, { fit: "cover" })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/${filename}`);
      req.body.collectionImages.push(filename);
    })
  );
  next();
};
exports.getAllProducts = async (req, res) => {
  // console.log(req.query);
  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];

  excludeFields.forEach((el) => delete queryObj[el]);

  // 1B) Advance Filtering

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  // console.log(JSON.parse(queryString));
  let query = Product.find(JSON.parse(queryString));

  // 2) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    // query = query.sort("-createdAt");
  }

  // 3) Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // 4) Pagination

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  // page=3&limit=10, 1-10, page=1 , 11-20, page=2 , 21-30, page=3
  query = query.skip(skip).limit(limit);

  // EXECUTE QUERY
  const products = await query.lean();

  const updatedProducts = products.map((item) => {
    const updatedItem = { ...item }; // Create a new object or clone the existing one
    updatedItem.price = numeral(item.price).format("0,0"); // Update the price field
    console.log("Updated item:", updatedItem); // Log the item after modification

    return updatedItem; // Return the modified object
  });

  // console.log("----------------------products", typeof products);
  // console.log("----------------------Gapp");
  // console.log("----------------------updated Products", typeof updatedProducts);
  // SEND RESPONSE
  try {
    res.status(200).json({
      message: "success",
      results: products.length,
      data: updatedProducts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  try {
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    console.log(req.files);
    // const {name,price,}
    if (req.file) {
      req.body.coverImage = req.file.filename;
      console.log(`Cover Image: ${req.body.coverImage}`);
    }

    const newProduct = await Product.create(req.body);
    console.log(`Product created: ${newProduct}`);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err,
    });
  }
};
