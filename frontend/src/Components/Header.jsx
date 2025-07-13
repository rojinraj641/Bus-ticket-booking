import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faLocationDot, faRepeat, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { boardingPoint, destinationPoint, setDate } from '../Features/Search/searchSlice.js';
import { removeBusList, setBusList } from '../Features/Search/busSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { boarding, destination, date } = useSelector((state) => state.search);
    const filters = useSelector((state)=>state.filters);
    const handleBoardingPoint = (value) => {
        dispatch(boardingPoint(value));
    }
    const handleDestinationPoint = (value) => {
        dispatch(destinationPoint(value));
    }
    const handleDate = (value) => {
        dispatch(setDate(value));
    }
    const handleSwap = () => {
        dispatch(boardingPoint(destination));
        dispatch(destinationPoint(boarding));
    }
    const buildQueryParams = (filters) => {
        const params = new URLSearchParams();

        if (filters.departureTime.length > 0) {
            params.append('departureTime', filters.departureTime.join(','));
        }

        if (filters.arrivalTime.length > 0) {
            params.append('arrivalTime', filters.arrivalTime.join(','));
        }

        if (filters.busType.length > 0) {
            params.append('busType', filters.busType.join(','));
        }

        if (filters.amenities.length > 0) {
            params.append('amenities', filters.amenities.join(','));
        }

        return params.toString(); 
    };

    const handleSearchClick = async () => {
        try {
            dispatch(removeBusList());
            const query = buildQueryParams(filters);
            const res = await axios.get(`api/v1/filtered?boarding=${boarding}&destination=${destination}&${query}`)
            navigate('/filtered')
            const { busList } = res.data.data;
            console.log(busList);
            dispatch(setBusList(busList));
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (
        <header className="flex flex-wrap justify-center gap-9 bg-sky-800 p-6">
            {/* Boarding Point */}
            <div className="flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md w-full sm:w-auto">
                <FontAwesomeIcon icon={faBusSimple} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Boarding Point"
                    value={boarding}
                    onChange={(e) => handleBoardingPoint(e.target.value)}
                    className="bg-transparent outline-none w-full sm:w-40"
                />
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center bg-white rounded-xl h-12 w-12 shadow-md">
                <button
                    onClick={() => handleSwap(boarding, destination)}
                >
                    <FontAwesomeIcon icon={faRepeat} className="text-gray-700" />
                </button>
            </div>

            {/* Destination Point */}
            <div className="flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md w-full sm:w-auto">
                <FontAwesomeIcon icon={faLocationDot} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Destination Point"
                    value={destination}
                    onChange={(e) => handleDestinationPoint(e.target.value)}
                    className="bg-transparent outline-none w-full sm:w-40"
                />
            </div>

            {/* Date Picker */}
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-md h-12 w-full sm:w-auto">
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500 mr-2" />
                <Datepicker autoFocus={false} calendarIcon={null} format='dd-MM-y' clearIcon={null} minDate={new Date()} maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                    value={date}
                    onChange={(date) => {
                        console.log(date);
                        handleDate(date)
                    }} />
            </div>

            {/* Search Button */}
            <button
                className="bg-red-500 text-white rounded-2xl h-12 px-6 w-full sm:w-auto hover:bg-red-800 transition"
                onClick={handleSearchClick}
            >
                Search Buses
            </button>
        </header>
    );
};

export default Header;
