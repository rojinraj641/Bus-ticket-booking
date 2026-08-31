import { createSlice } from "@reduxjs/toolkit";

const selectedSeatSlice = createSlice({
    name: 'selectedSeats',
    initialState: {
        seatIds: []
    },
    reducers: {
        toggleSeatSelection: (state, action) => {
            const { seatId } = action.payload;
            const index = state.seatIds.indexOf(seatId);
            if(index === -1){
                state.seatIds.push(seatId);
            }
            else{
                state.seatIds.splice(index,1);
            }
        },
    }
})

export const { toggleSeatSelection } = selectedSeatSlice.actions;
export default selectedSeatSlice.reducer