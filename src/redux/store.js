import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productModalReducer from "./product-modal/productModalSlice";
import cartItemsReducer from "./shopping-cart/cartItemsSlice";
import authReducer from "./auth/authSlice";
import productReducer from "./productSlice/productSlice";
import orderReducer from "./order/orderSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  productModal: productModalReducer,
  order: orderReducer,
  cartItems: cartItemsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
