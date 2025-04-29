import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faLocationDot, faRepeat, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Header = () => {
    const [boarding, setBoarding] = useState('');
    const [destination, setDestination] = useState('');
    const [dateType, setDateType] = useState(new Date());

    return (
        <header className="flex flex-wrap justify-center gap-9 bg-sky-900 p-6">
            {/* Boarding Point */}
            <div className="flex items-center bg-white text-black rounded-2xl pl-4 pr-2 h-12 shadow-md w-full sm:w-auto">
                <FontAwesomeIcon icon={faBusSimple} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Boarding Point"
                    value={boarding}
                    onChange={(e) => setBoarding(e.target.value)}
                    className="bg-transparent outline-none w-full sm:w-40"
                />
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center bg-white rounded-xl h-12 w-12 shadow-md">
                <button>
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
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent outline-none w-full sm:w-40"
                />
            </div>

            {/* Date Picker */}
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-md h-12 w-full sm:w-auto">
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500 mr-2" />
                <Datepicker autoFocus={false} calendarIcon={null} format='dd-MM-y' clearIcon={null} autoHide={true} minDate={new Date()} maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                    value={dateType}
                    onChange={(date) => {
                        console.log(date);
                        setDateType(date)
                    }} />
            </div>

            {/* Search Button */}
            <button className="bg-red-500 text-white rounded-2xl h-12 px-6 w-full sm:w-auto hover:bg-red-800 transition">
                Search Buses
            </button>
        </header>
    );
};

export default Header;
