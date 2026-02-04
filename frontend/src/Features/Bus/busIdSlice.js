import { createSlice } from "@reduxjs/toolkit";

const busId = createSlice({
    name: 'busId',
    initialState: {
        busId: ''
     },
    reducers: {
        setBusId: (state,action)=>{
         state.busId = action.payload;
        },
        resetBusId: (state)=>{
            state.busId = ''
        }
    }
})

export const { setBusId, resetBusId } = busId.actions;
export default busId.reducer