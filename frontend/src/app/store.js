import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../Features/Search/searchSlice.js';
import busReducer from '../Features/Search/busSlice.js';
import seatsReducer from '../Features/Seats/seatSlice.js';
import selectedSeatReducer from '../Features/Seats/selectedSeatsSlice.js'
import filterReducer from '../Features/Search/filterSlice.js';
import passengerReducer from '../Features/Passengers/passengerSlice.js';
import priceReducer from '../Features/Seats/totalPriceSlice.js';
import busIdReducer from '../Features/Bus/busIdSlice.js';
import cancellationReducer from '../Features/Bus/cancellationSlice.js';
import travelTimeReducer from '../Features/Bus/travelTimeSlice.js';
import selectedCouponsReducer from '../Features/Coupons/couponSlice.js';
import userReducer from '../Features/User/userSlice.js'
import authSliceReducer from '../Features/User/authSlice.js'

const store = configureStore({
    reducer:{
        search: searchReducer,
        bus: busReducer,
        seats: seatsReducer,
        selectedSeats: selectedSeatReducer,
        filters: filterReducer,
        passengers: passengerReducer,
        totalPrice: priceReducer,
        busId: busIdReducer,
        cancellation: cancellationReducer,
        travelTime: travelTimeReducer,
        selectedCoupons: selectedCouponsReducer,
        user: userReducer,
        authSlice: authSliceReducer
    }
})

export default store;