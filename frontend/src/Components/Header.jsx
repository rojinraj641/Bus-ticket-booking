import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faLocationDot, faRepeat, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { boardingPoint, destinationPoint, setDate } from '../Features/Search/searchSlice.js';
import { removeBusList, setBusList,setLoading } from '../Features/Search/busSlice.js';
import { setTravelTime } from '../Features/Bus/travelTimeSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boarding, destination, date } = useSelector((state) => state.search);
  const [swapAnimate, setSwapAnimate] = useState(false);


  const handleBoardingPoint = (value) => {
    const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    dispatch(boardingPoint(formatted));
  };

  const handleDestinationPoint = (value) => {
    const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    dispatch(destinationPoint(formatted));
  };

  const handleDate = (value) => {
    dispatch(setDate(value));
  };

  const handleSwap = () => {
    setSwapAnimate(true);
    dispatch(boardingPoint(destination));
    dispatch(destinationPoint(boarding));
    setTimeout(() => setSwapAnimate(false), 300);
  };

  const handleSearchClick = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`api/v1/filtered?boarding=${boarding}&destination=${destination}&date=${date}`);
      dispatch(setBusList(res.data.data.busList));
      navigate('/filtered');
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <header className="flex flex-wrap justify-center gap-4 bg-sky-800 p-4 sm:p-6">
      <ToastContainer />
      {/* Mobile Layout */}
      <div className="flex flex-col gap-3 w-full sm:hidden relative bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faBusSimple} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Boarding Point"
            value={boarding}
            onChange={(e) => handleBoardingPoint(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <button onClick={handleSwap} aria-label="Swap Locations">
            <FontAwesomeIcon icon={faRepeat} className={`text-gray-600 ${swapAnimate ? 'animate-rotate-once' : ''}`} />
          </button>
        </div>

        <div className="flex items-center">
          <FontAwesomeIcon icon={faLocationDot} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Destination Point"
            value={destination}
            onChange={(e) => handleDestinationPoint(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md">
        <FontAwesomeIcon icon={faBusSimple} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Boarding Point"
          value={boarding}
          onChange={(e) => handleBoardingPoint(e.target.value)}
          className="bg-transparent outline-none w-40 text-sm"
        />
      </div>

      <div className="hidden sm:flex items-center justify-center bg-white rounded-xl h-12 w-12 shadow-md">
        <button onClick={handleSwap} aria-label="Swap Locations">
          <FontAwesomeIcon icon={faRepeat} className={`text-gray-700 transition-transform ${swapAnimate ? 'animate-rotate-once' : ''}`} />
        </button>
      </div>

      <div className="hidden sm:flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md">
        <FontAwesomeIcon icon={faLocationDot} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Destination Point"
          value={destination}
          onChange={(e) => handleDestinationPoint(e.target.value)}
          className="bg-transparent outline-none w-40 text-sm"
        />
      </div>

      {/* Date Picker */}
      <div className="flex items-center bg-white rounded-2xl px-3 shadow-md h-12 w-full sm:w-auto border border-sky-300 hover:shadow-lg transition-all">
        <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500 mr-2" />
        <Datepicker
          calendarIcon={null}
          clearIcon={null}
          format="dd-MM-y"
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
          value={date}
          onChange={(date) => handleDate(date)}
          className="text-sm font-medium focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <button
        className="bg-red-500 text-white rounded-2xl h-12 px-6 w-full sm:w-auto hover:bg-red-700 font-semibold transition"
        onClick={handleSearchClick}
      >
        Search Buses
      </button>
    </header>
  );
};

export default Header;

