import { createSlice } from '@reduxjs/toolkit';

const seatSlice = createSlice({
    name: 'seat',
    initialState: { selectedSeats: []},
    reducers: {
        addSelectedSeats: (state,action) => {
            state.selectedSeats.push(action.payload);
        },
        removeSelectedSeats: (state,action) => {
            state.selectedSeats = state.selectedSeats.filter((id)=> id !== action.payload);
        },
        clearSelection: (state,action) => {
            state.selectedSeats = [];
        },
    }
})

export const { addSelectedSeats, removeSelectedSeats, clearSelection } = seatSlice.actions;
export default seatSlice.reducer