import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import MyBooking from './Pages/MyBooking'
import Wallet from './Pages/Wallet'
import FilteredResult from "./pages/FilteredResult";
import Payment from "./Pages/Payment";
import PassengerDetails from "./Pages/PassengerDetails";
import TrackTicket from "./Pages/TrackTicket";
import ProtectedRoute from './Components/ProtectedRoute';
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer} from "react-toastify"
import { useEffect } from "react";
import { refreshSession } from "./Features/User/authSlice";
import BusLoader from "./Components/BusLoader";

function App() {
  const dispatch = useDispatch();
  const { message, success } = useSelector((state)=>state.toast);
  const { isLoading } = useSelector((state)=>state.loading);

  useEffect(()=>{
    dispatch(refreshSession());
  }, [dispatch]);

  useEffect(()=>{
    if(success && message){
      toast.success(message);
    }
    if(!success && message){
      toast.error(message);
    }
  }, [success, message]);

  return (
    <Router>
      {isLoading && <BusLoader />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/my-booking' element={<ProtectedRoute><MyBooking/></ProtectedRoute>}/>
        <Route path='/wallet' element={<ProtectedRoute><Wallet/></ProtectedRoute>}/>
        <Route path='/track-ticket' element={<ProtectedRoute><TrackTicket/></ProtectedRoute>}/>
        <Route path='/filtered' element={<FilteredResult/>}/>
        <Route path='/passengerInfo' element={<ProtectedRoute><PassengerDetails/></ProtectedRoute>}/>
        <Route path="/payment" element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App