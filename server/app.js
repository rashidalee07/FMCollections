const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Replace this with the origin of your frontend application
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  // console.log(req.cookies.token);
  // console.log(req.cookies.userToken);
  // console.log(req.user);
  const path = req.path;
  console.log(`Requested path: ${path}`);

  next();
});
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
