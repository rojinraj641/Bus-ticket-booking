import { createSlice } from "@reduxjs/toolkit";

const cancellation = createSlice({
    name: 'cancellation',
    initialState: true,
    reducers: {
        updateCancellation: (state,action)=>action.payload
    }
})

export const {updateCancellation} = cancellation.actions;
export default cancellation.reducer