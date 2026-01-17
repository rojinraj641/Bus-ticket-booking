import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
    name: 'bus',
    initialState: {
        busList: [],
        loading: false
    },
    reducers: {
        setBusList: (state,action) => {state.busList = action.payload},
        removeBusList: (state) => {state.busList = []},
        setLoading: (state,action)=>{
            state.loading = action.payload
        }
    }
})

export const { setBusList,removeBusList,setLoading } = busSlice.actions;
export default busSlice.reducer;