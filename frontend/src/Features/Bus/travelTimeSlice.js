import { createSlice } from "@reduxjs/toolkit";

const travelTime = createSlice({
    name: 'travelTime',
    initialState: [],
    reducers:{
        setTravelTime: (state,action)=>{
            const {busId,travelTime} = action.payload;
            state.push({busId,travelTime})
        },
        resetTravelTime: ()=>{
            return []
        }
    }
})

export const {setTravelTime, resetTravelTime} = travelTime.actions;
export default travelTime.reducer;