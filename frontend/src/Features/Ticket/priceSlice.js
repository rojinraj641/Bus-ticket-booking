import { createSlice } from "@reduxjs/toolkit";

const price = createSlice({
  name: "price",
  initialState: {
    price: 0
  },
  reducers: {
    addPrice: (state, action) => {
      state.price += Number(action.payload);
    },
    subtractPrice: (state, action) => {
      state.price = Math.max(
        state.price - Number(action.payload),
        0
      );
    },
    resetPrice: (state) => {
      state.price = 0;
    }
  }
});

export const { addPrice, subtractPrice, resetPrice } = price.actions;
export default price.reducer;
