import { createSlice } from "@reduxjs/toolkit";

const passengerSlice = createSlice({
    name: 'passenger',
    initialState: [],
    reducers: {
        addPassenger: (state, action) => {
            state.push(action.payload);
        },
        resetPassenger: ()=>[]
    }
})

export const { addPassenger, updatePassenger, resetPassenger } = passengerSlice.actions;
export default passengerSlice.reducer;