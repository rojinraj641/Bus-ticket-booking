import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: { departureTime: [], arrivalTime: [], busType: [], amenities: [] },
    reducers: {
        setDepartureTime: (state, action) => {
            state.departureTime = action.payload;
        },
        setArrivalTime: (state, action) => {
            state.arrivalTime = action.payload;
        },
        setBusType: (state, action) => {
            state.busType = action.payload;
        },
        setAmenities: (state, action) => {
            state.amenities = action.payload;
        }
    }
})

export const { setDepartureTime, setArrivalTime, setBusType, setAmenities } = filterSlice.actions;
export default filterSlice.reducer