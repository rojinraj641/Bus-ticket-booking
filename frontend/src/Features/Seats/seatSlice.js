import { createSlice } from '@reduxjs/toolkit';

const seatSlice = createSlice({
  name: 'seats',
  initialState: {
    seats: []
  },
  reducers: {
    addSeats: (state, action) => {
      state.seats = action.payload;
    },
    clearSeats: (state) => {
      state.seats = [];
    }
  }
});

export const { addSeats,clearSeats } = seatSlice.actions;
export default seatSlice.reducer;
