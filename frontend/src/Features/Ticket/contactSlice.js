import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        email: '',
        phone: ''
    },
    reducers: {
        addContactDetails: (state,action)=>{
            const {email, phone} = action.payload;
            state.email = email;
            state.phone = phone
        },
        removeContactDetails: ((state)=>{
            email = '',
            phone = ''
        })
    }
})

export const {addContactDetails, removeContactDetails} = contactSlice.actions;

export default contactSlice.reducer;