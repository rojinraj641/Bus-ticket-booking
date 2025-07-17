import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup"
import OtpVerify from "./Pages/OtpVerify"
import MyBooking from './Pages/MyBooking'
import Wallet from './Pages/Wallet'
import FilteredResult from "./pages/FilteredResult";
import Payment from "./Pages/Payment";
import PassengerDetails from "./Pages/PassengerDetails";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/register' element={<Signup/>}/>
        <Route path='/verifyOTP' element={<OtpVerify/>}/>
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
