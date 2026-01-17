import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup"
import OtpVerify from "./Pages/OtpVerify"
import MyBooking from './Pages/MyBooking'
import Wallet from './Pages/Wallet'
import FilteredResult from "./pages/FilteredResult";
import Payment from "./Pages/Payment";
import PassengerDetails from "./Pages/PassengerDetails";
import Loader from "./Components/Loader";
import './App.css';
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state)=>state.bus.loading)
  return (
    <Router>
      {loading && <Loader/>}
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
