// import React, { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import HomePage from "./components/HomePage";
import LoginPage from "./pages/LoginPage";
// import { useParams } from "react-router-dom";
import AddProductPage from "./pages/AddProductPage";
import "./App.css";
// import { useSelector } from "react-redux";

import WishlistPage from "./pages/WishlistPage";
import CartPage from "./cart/cartPage";
function App() {
  // console.log("From App js ", userData);
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/products/" element={<ProductGrid />}></Route>
      <Route path="/products/:id" element={<ProductPage />}></Route>
      <Route path="/add-product" element={<AddProductPage />}></Route>
      <Route path="/auth/login" element={<LoginPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/your-wishlist" element={<WishlistPage />}></Route>
    </Routes>
  );
}

export default App;
