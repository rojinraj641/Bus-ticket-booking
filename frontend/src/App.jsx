import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import OtpVerify from "./pages/OtpVerify"
import MyBooking from './pages/MyBooking'
import Wallet from './pages/Wallet'
import FilteredResult from "./pages/FilteredResult";
import Payment from "./pages/Payment";
import PassengerDetails from "./pages/PassengerDetails";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp-verify' element={<OtpVerify/>}/>
        <Route path='/my-booking' element={<MyBooking/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/filtered' element={<FilteredResult/>}/>
        <Route path='/passengerInfo' element={<PassengerDetails/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </Router>
  )
}

export default App
