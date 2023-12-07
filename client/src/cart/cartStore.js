import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // For handling asynchronous actions
import rootReducer from "./cartReducers"; // Assuming your reducer file is named cartReducers.js

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;
