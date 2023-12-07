import axios from "axios";

export const FETCH_USER_DATA_REQUEST = "FETCH_USER_DATA_REQUEST";
export const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS";
export const FETCH_USER_DATA_FAILURE = "FETCH_USER_DATA_FAILURE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export const fetchUserDataRequest = () => ({
  type: "FETCH_USER_DATA_REQUEST",
});

export const fetchUserDataSuccess = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DATA_REQUEST });

    try {
      const response = await axios.get("/api/v1/users/cart", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // const data = await response.json();
      console.log(
        "From get cart",
        response.data.data.map((item, i) => item.product)
      );
      dispatch({
        type: FETCH_USER_DATA_SUCCESS,
        // payload: response.data.data.map((item) => item),
        payload: response.data.data.map((item) => item.product),
      });
    } catch (error) {
      dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
    }
  };
};

export const fetchUserDataFailure = (error) => ({
  type: "FETCH_USER_DATA_FAILURE",
  payload: error,
});

export const addToCart = (productId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DATA_REQUEST });

    try {
      const response = await axios.post(`/api/v1/users/cart/${productId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("From actions file", response.data.cartItems);
      dispatch({ type: ADD_TO_CART, payload: response.data.cartItems });
    } catch (error) {
      dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
    }
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DATA_REQUEST });

    try {
      const response = await axios.patch(`/api/v1/users/cart/${productId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("From actions file", response.data);
      dispatch({ type: REMOVE_FROM_CART, payload: productId });
    } catch (error) {
      dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
    }
  };
};

export const handleIncrement = (productId, productQuantity) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DATA_REQUEST });
    console.log("We are in handle increment action now");
    try {
      const response = await axios.patch(
        `/api/v1/users/update-cart/${productId}`,
        {
          action: "increment",
          quantity: productQuantity,
        }
      );
      console.log("From increment", response.data.data);
      dispatch({
        type: INCREMENT_QUANTITY,
        payload: response.data.data,
      });

      // Handle the response as needed
    } catch (error) {
      console.error("Error updating cart:", error);
      // Handle the error
    }
  };
};
