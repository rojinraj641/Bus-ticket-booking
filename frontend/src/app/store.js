import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../Features/Search/searchSlice.js';
import busReducer from '../Features/Search/busSlice.js';
import seatReducer from '../Features/Seats/seatSlice.js';
import filterReducer from '../Features/Search/filterSlice.js';
import passengerReducer from '../Features/Passengers/passengerSlice.js';
import priceReducer from '../Features/Seats/totalPriceSlice.js';
import selectedBusReducer from '../Features/Bus/selectedBusSlice.js';
import cancellationReducer from '../Features/Bus/cancellationSlice.js';
import selectedCouponsReducer from '../Features/Coupons/couponSlice.js';
import userReducer from '../Features/User/userSlice.js'

const store = configureStore({
    reducer:{
        search: searchReducer,
        bus: busReducer,
        seat: seatReducer,
        filters: filterReducer,
        passengers: passengerReducer,
        totalPrice: priceReducer,
        selectedBus: selectedBusReducer,
        cancellation: cancellationReducer,
        selectedCoupons: selectedCouponsReducer,
        user: userReducer
    }
})

export default store;