import {createSlice} from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        message: '',
        success: false
    },
    reducers: {
        setToast: (state, action) => {
            const {message, success} = action.payload;
            state.message = message;
            state.success = success;
        },
        resetToast: (state) => {
            state.message = '';
            state.success = false;
        }
    }
   
})

export const { setToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;
