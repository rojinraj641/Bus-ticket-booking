import { createSlice } from "@reduxjs/toolkit";

const userDetails = createSlice({
    name: 'user',
    initialState: {phone: '', email: '', name: ''},
    reducers: {
        setUserDetails: (state, action)=>{
            const {phone, email, name} = action.payload;
            state.phone = phone;
            state.email = email;
            state.name = name;
        },
        resetUserDetails: (state)=>{
            state.phone = '',
            state.email = '',
            state.name = ''
        }
    }
})

export const { setUserDetails, resetUserDetails } = userDetails.actions;
export default userDetails.reducer;