import { createSlice } from "@reduxjs/toolkit";

const selectedSeatSlice = createSlice({
    name: 'selectedSeats',
    initialState: {
        busId: null,
        seatIds: []
    },
    reducers: {
        toggleSeatSelection: (state, action) => {
            const { busId, seatId } = action.payload;
            if(state.busId && state.busId !== busId){
                state.seatIds = [];
            }
            state.busId = busId;

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