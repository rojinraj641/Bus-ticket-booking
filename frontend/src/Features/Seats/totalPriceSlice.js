import { createSlice } from "@reduxjs/toolkit";

const totalPriceSlice = createSlice({
    name: 'totalPrice',
    initialState: 0,
    reducers: {
        addPrice: (state, action) => {
            return state + action.payload;
        },
        subtractPrice: (state, action) => {
            return Math.max(state - action.payload, 0);
        },
        resetPrice: () => 0
    }
})

export const { addPrice, subtractPrice, resetPrice } = totalPriceSlice.actions;
export default totalPriceSlice.reducer