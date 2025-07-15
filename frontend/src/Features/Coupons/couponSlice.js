import { createSlice } from "@reduxjs/toolkit";

const selectedCoupons = createSlice({
    name: 'coupons',
    initialState: [],
    reducers: {
        addCoupons: (state,action)=>{
            state.push(action.payload);
        },
        resetCoupons: ()=>[]
    }
})

export const {addCoupons, resetCoupons} = selectedCoupons.actions;
export default selectedCoupons.reducer