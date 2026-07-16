import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
  name: "totalPrice",
  initialState: {
    totalPrice: 0
  },
  reducers: {
    addPrice: (state, action) => {
      state.totalPrice += Number(action.payload);
    },
    subtractPrice: (state, action) => {
      state.totalPrice = Math.max(
        state.totalPrice - Number(action.payload),
        0
      );
    },
    resetPrice: (state) => {
      state.totalPrice = 0;
    }
  }
});

export const { addPrice, subtractPrice, resetPrice } = priceSlice.actions;
export default priceSlice.reducer;
