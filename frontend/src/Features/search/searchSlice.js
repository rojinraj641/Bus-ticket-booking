import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: { boarding: '',destination: '', date: new Date().toISOString().split("T")[0]},
    reducers: {
        setBoarding: (state,action) => {state.boarding = action.payload},
        setDestination: (state,action) => {state.destination = action.payload},
        setDate: (state,action) => {state.date = action.payload},
    }
})

export const { setBoarding, setDestination, setDate } = searchSlice.actions;
export default searchSlice.reducer;