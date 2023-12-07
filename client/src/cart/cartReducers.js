import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "./actionsCart";

const initialState = {
  userData: null,
  productsData: null,
  loading: false,
  error: null,
  cart: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_DATA_SUCCESS:
      console.log("Fetched cart data", action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        // userData: action.payload,
        productsData: action.payload,
        cart: action.payload,
      };
    case FETCH_USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    // Reducer logic for INCREMENT_QUANTITY
    case INCREMENT_QUANTITY:
      const { product: updatedProductId, quantity: updatedProductQuantity } =
        action.payload;

      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === updatedProductId) {
            // Update the quantity of the matching product
            return {
              ...item,
              quantity: updatedProductQuantity,
            };
          }
          // Keep other items unchanged
          console.log("From inc reducer", item);
          console.log("From updated quantity", updatedProductQuantity);
          console.log("From inc id", updatedProductId);
          return item;
        }),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
