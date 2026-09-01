import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../Features/Navigation/loadingSlice.js';
import searchReducer from '../Features/Search/searchSlice.js';
import busReducer from '../Features/Bus/busSlice.js';
import seatsReducer from '../Features/Seats/seatSlice.js';
import selectedSeatReducer from '../Features/Seats/selectedSeatsSlice.js'
import filterReducer from '../Features/Search/filterSlice.js';
import passengerReducer from '../Features/Passengers/passengerSlice.js';
import contactReducer from "../Features/Ticket/contactSlice.js";
import busIdReducer from '../Features/Bus/busIdSlice.js';
import seatLockTimeReducer from '../Features/Seats/seatLockTime.js';
import priceReducer from '../Features/Ticket/priceSlice.js';
import cancellationReducer from '../Features/Bus/cancellationSlice.js';
import travelTimeReducer from '../Features/Bus/travelTimeSlice.js';
import selectedCouponsReducer from '../Features/Coupons/couponSlice.js';
import userReducer from '../Features/User/userSlice.js'
import authSliceReducer from '../Features/User/authSlice.js'
import uiSliceReducer from '../Features/User/uiSlice.js'
import toastReducer from '../Features/Error/toastSlice.js'

const store = configureStore({
    reducer:{
        loading: loadingReducer,
        search: searchReducer,
        bus: busReducer,
        seats: seatsReducer,
        selectedSeats: selectedSeatReducer,
        filters: filterReducer,
        passengers: passengerReducer,
        busId: busIdReducer,
        seatLockTime: seatLockTimeReducer,
        price: priceReducer,
        contact: contactReducer,
        cancellation: cancellationReducer,
        travelTime: travelTimeReducer,
        selectedCoupons: selectedCouponsReducer,
        user: userReducer,
        auth: authSliceReducer,
        ui: uiSliceReducer,
        toast: toastReducer,
    }
})

export default store;