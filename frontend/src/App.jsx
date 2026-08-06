import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import MyBooking from './Pages/MyBooking'
import Wallet from './Pages/Wallet'
import FilteredResult from "./pages/FilteredResult";
import Payment from "./Pages/Payment";
import PassengerDetails from "./Pages/PassengerDetails";
import TrackTicket from "./Pages/TrackTicket";
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
        <Route path='/my-booking' element={<MyBooking/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/track-ticket' element={<TrackTicket/>}/>
        <Route path='/filtered' element={<FilteredResult/>}/>
        <Route path='/passengerInfo' element={<PassengerDetails/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </Router>
  )
}

export default App
