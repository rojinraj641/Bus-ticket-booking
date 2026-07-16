import { createSlice } from "@reduxjs/toolkit";

const passengerSlice = createSlice({
    name: 'passenger',
    initialState: [],
    reducers: {
        upsertPassenger: (state, action) => {
            const { seatId, name, age, gender, place } = action.payload;

            const existingIndex = state.findIndex(p => p.seatId === seatId);

            if (existingIndex !== -1) {
                // Update existing passenger
                state[existingIndex] = {
                    seatId,
                    name,
                    age,
                    gender,
                    place
                };
            } else {
                // Add new passenger
                state.push({
                    seatId,
                    name,
                    age,
                    gender,
                    place
                });
            }
        },

        removePassengerBySeat: (state, action) => {
            return state.filter(p => p.seatId !== action.payload);
        },

        resetPassenger: () => []
    }
});

export const {upsertPassenger,removePassengerBySeat,resetPassenger} = passengerSlice.actions;

export default passengerSlice.reducer;