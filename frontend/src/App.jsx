import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import OtpVerify from "./pages/OtpVerify"
import MyBooking from './pages/MyBooking'
import Wallet from './pages/Wallet'
import Offers from './pages/Offers'
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
        <Route path='/offers' element={<Offers/>}/>
      </Routes>
    </Router>
  )
}

export default App
