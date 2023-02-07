import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
    // GET_PRICE_RANGE(state, action) {
    //   const { products } = action.payload;
    //   const result = [];
    //   products.map((product) => {
    //     const price = product.price;
    //     return result.push(price);
    //   });
    // },
  },
});

export const { STORE_PRODUCTS } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export default productSlice.reducer;
