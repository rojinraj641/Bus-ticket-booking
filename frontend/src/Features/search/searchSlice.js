import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: { boarding: '',destination: '', date: Date.now(), distance: 0},
    reducers: {
        boardingPoint: (state,action) => {state.boarding = action.payload},
        destinationPoint: (state,action) => {state.destination = action.payload},
        setDate: (state,action) => {state.date = action.payload},
        setDistance: (state,action) => {state.distance = action.payload}
    }
})

export const { boardingPoint, destinationPoint, setDate, setDistance } = searchSlice.actions;
export default searchSlice.reducer;