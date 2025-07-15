import { createSlice } from "@reduxjs/toolkit";

const selectedBus = createSlice({
    name: 'selectedBus',
    initialState: {
        busName: '',
        boardingTime: '',
        droppingTime: '',
        busType: ''
     },
    reducers: {
        setBusDetails: (state,action)=>{
         const {busName, boardingTime, droppingTime, busType} = action.payload;
         state.busName = busName;
         state.boardingTime = boardingTime;
         state.droppingTime = droppingTime;
         state.busType = busType
        },
        resetBusDetails: (state)=>{
            state.busName = '';
            state.boardingTime = '';
            state.droppingTime = '';
            state.busType = '';
        }
    }
})

export const { setBusDetails, resetBusDetails } = selectedBus.actions;
export default selectedBus.reducer