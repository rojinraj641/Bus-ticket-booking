import { useState, useRef } from "react";
import { MapPin, CalendarDays } from "lucide-react";
import useMediaQuery from "../Hooks/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = () => {
    const dateRef = useRef(null);
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const boarding = useSelector((state) => state.search.boarding);
    const destination = useSelector((state) => state.search.destination);
    const date = useSelector((state) => state.search.date);

    // Use the custom hook to determine if the screen width is less than 768px
    const isMobile = useMediaQuery('(max-width: 767px)');

    if (isMobile) {
        return (
            <div className="bg-white backdrop-blur-md border-t border-[#F8FAFC] shadow-xl rounded-t-2xl py-10 px-4 flex flex-col gap-3 w-full">
                <div className="relative">
                    <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]"
                    />
                    <input
                        type="text"
                        placeholder="Boarding Point"
                        value={boarding}
                        onChange={(e) => dispatch(setBoarding(e.target.value))}
                        className="h-12 w-full pl-9 bg-[#F8FAFC] text-xs md:text-sm text-[#4B5563] placeholder:text-[#4B5563] border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                </div>

                <div className="relative">
                    <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]"
                    />
                    <input
                        type="text"
                        placeholder="Destination Point"
                        value={destination}
                        onChange={(e) => dispatch(setDestination(e.target.value))}
                        className="h-12 w-full pl-9 bg-[#F8FAFC] text-xs md:text-sm text-[#4B5563] placeholder:text-[#4B5563] border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                </div>

                <div className="relative">
                    <input
                        ref={dateRef}
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) => dispatch(setDate(e.target.value))}
                        className="h-12 w-full px-3 text-xs md:text-sm bg-[#F8FAFC] text-[#4B5563] border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                    <CalendarDays
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] cursor-pointer"
                        onClick={() => dateRef.current?.showPicker()}
                    />
                </div>

                <button className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm md:text-base transition-colors duration-200">
                    Search Buses
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white/40 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 flex items-center gap-4 w-fit max-w-6xl">
            <div className="relative flex-1">
                <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563]"
                />
                <input
                    type="text"
                    placeholder="Boarding Point"
                    value={boarding}
                    onChange={(e) => dispatch(setBoarding(e.target.value))}
                    className="h-14 pl-10 bg-[#F8FAFC] text-[#4B5563]  placeholder:text-[#4B5563] border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
            </div>
            <div className="relative flex-1">
                <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563]"
                />
                <input
                    type="text"
                    placeholder="Destination Point"
                    value={destination}
                    onChange={(e) => dispatch(setDestination(e.target.value))}
                    className="h-14 pl-10 bg-[#F8FAFC]  placeholder:text-[#4B5563] border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
            </div>
            <div className="relative flex-1">
                <input
                    ref={dateRef}
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => dispatch(setDate(e.target.value))}
                    className="h-14 px-4 bg-[#F8FAFC] text-[#4B5563] border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
                <CalendarDays
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4B5563] cursor-pointer"
                    onClick={() => dateRef.current?.showPicker()}
                />
            </div>

            <button className="h-14 w-40 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200">
                Search Buses
            </button>
        </div>
    );
};

export default SearchBar;