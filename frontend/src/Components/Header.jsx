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
    const filters = useSelector((state) => state.filters);

    const handleBoardingPoint = (value) => dispatch(boardingPoint(value));
    const handleDestinationPoint = (value) => dispatch(destinationPoint(value));
    const handleDate = (value) => dispatch(setDate(value));
    const handleSwap = () => {
        dispatch(boardingPoint(destination));
        dispatch(destinationPoint(boarding));
    };

    const buildQueryParams = (filters) => {
        const params = new URLSearchParams();
        if (filters.departureTime.length) params.append('departureTime', filters.departureTime.join(','));
        if (filters.arrivalTime.length) params.append('arrivalTime', filters.arrivalTime.join(','));
        if (filters.busType.length) params.append('busType', filters.busType.join(','));
        if (filters.amenities.length) params.append('amenities', filters.amenities.join(','));
        return params.toString();
    };

    const handleSearchClick = async () => {
        try {
            dispatch(removeBusList());
            const query = buildQueryParams(filters);
            const res = await axios.get(`api/v1/filtered?boarding=${boarding}&destination=${destination}&${query}`);
            const { busList } = res.data.data;
            dispatch(setBusList(busList));
            navigate('/filtered');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <header className="bg-sky-800 px-4 py-6">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center sm:gap-6">

                {/* Mobile Merged Card */}
                <div className="relative sm:hidden bg-white rounded-2xl p-4 shadow-md w-full">
                    {/* Boarding Input */}
                    <div className="flex items-center mb-3">
                        <FontAwesomeIcon icon={faBusSimple} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Boarding Point"
                            value={boarding}
                            onChange={(e) => handleBoardingPoint(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>

                    {/* Swap Button - Positioned to right, between inputs */}
                    <button
                        onClick={handleSwap}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                    >
                        <FontAwesomeIcon icon={faRepeat} className="text-gray-700" />
                    </button>

                    {/* Destination Input */}
                    <div className="flex items-center mt-3">
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
                <div className="hidden sm:flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md w-full sm:w-auto">
                    <FontAwesomeIcon icon={faBusSimple} className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Boarding Point"
                        value={boarding}
                        onChange={(e) => handleBoardingPoint(e.target.value)}
                        className="bg-transparent outline-none w-full text-sm"
                    />
                </div>

                <div className="hidden sm:flex items-center justify-center bg-white rounded-xl h-12 w-12 shadow-md">
                    <button onClick={handleSwap}>
                        <FontAwesomeIcon icon={faRepeat} className="text-gray-700" />
                    </button>
                </div>

                <div className="hidden sm:flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md w-full sm:w-auto">
                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Destination Point"
                        value={destination}
                        onChange={(e) => handleDestinationPoint(e.target.value)}
                        className="bg-transparent outline-none w-full text-sm"
                    />
                </div>

                {/* Date Picker */}
                <div className="flex items-center bg-white rounded-2xl p-2 shadow-md h-12 w-full sm:w-auto">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500 mr-2" />
                    <Datepicker
                        autoFocus={false}
                        calendarIcon={null}
                        format="dd-MM-y"
                        clearIcon={null}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                        value={date}
                        onChange={(date) => handleDate(date)}
                    />
                </div>

                {/* Search Button */}
                <div className="w-full sm:w-auto">
                    <button
                        className="bg-red-500 text-white rounded-2xl h-12 px-6 w-full hover:bg-red-800 transition font-semibold"
                        onClick={handleSearchClick}
                    >
                        Search Buses
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
