import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: { boarding: '',destination: '', date: Date.now()},
    reducers: {
        boardingPoint: (state,action) => {state.boarding = action.payload},
        destinationPoint: (state,action) => {state.destination = action.payload},
        setDate: (state,action) => {state.date = action.payload}
    }
})

export const { boardingPoint, destinationPoint, setDate } = searchSlice.actions;
export default searchSlice.reducer;