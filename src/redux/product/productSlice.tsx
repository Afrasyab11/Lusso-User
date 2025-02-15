import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productId: "",
  productsList: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductId(state, action) {
      state.productId = action.payload;
    },

    getProductListData(state, action) {
      state.productsList = action.payload;
    },

  },
});

export const { getProductId, getProductListData} = productSlice.actions;
export default productSlice.reducer;
