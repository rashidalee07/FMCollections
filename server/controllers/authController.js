const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
  // next();
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  // 1) Check if email and password exists

  if (!email || !password) {
    return next("Please provide 6mail and p@ssword");
  }
  // 2) Check if user exist  and passsword exists (query the database)
  const user = await User.findOne({ email }).select("+password");
  // console.log("user:", user);
  // correctPass function is available on the documents of User data model.
  // const correct = await user.correctPassword(password, user.password);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next("Incorrect 6mail or p@ssword");
  }

  // 3) If every thing ok, send token the client
  const token = signToken(user._id);
  res.cookie("userToken", token, {
    // maxAge: 300000,
    httpOnly: true,
    domain: "localhost", // or your domain name
    path: "/", // specify the root path so the cookie is accessible from the entire application
  });
  console.log("Logging from Login Middleware");
  // console.log(req.cookies.userToken);
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of its there
  // console.log("========================Auth=========================");
  // console.log(req.cookies.token);
  // console.log(req.cookies.userToken);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }
  if (req.cookies.userToken) {
    token = req.cookies.userToken;
    // token = req.cookies.userToken;
    // console.log(token);
  }
  if (!token) {
    return next("You are not logged in! Please login");
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists and this steps shows that token is not tempared or changed

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next("User with this token no more exists");
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next("User recently changed password! Please login again");
  }

  // GRANT ACCESS TO PROTECT ROUTE
  req.user = currentUser;
  // console.log(req.user);
  next();
};
