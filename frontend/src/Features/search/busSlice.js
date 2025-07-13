import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
    name: 'bus',
    initialState: {busList: []},
    reducers: {
        setBusList: (state,action) => {state.busList = action.payload},
        removeBusList: (state) => {state.busList = []}
    }
})

export const { setBusList,removeBusList } = busSlice.actions;
export default busSlice.reducer;