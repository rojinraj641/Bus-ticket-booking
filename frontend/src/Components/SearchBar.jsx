import { useState, useEffect, useRef } from "react";
import { MapPin, CalendarDays } from "lucide-react";
import useMediaQuery from "../Hooks/useMediaQuery";
import api from "../Api/axios.api.js";
import { useSelector, useDispatch } from "react-redux";
import { setBoarding, setDestination, setDate } from "../Features/Search/searchSlice";

const SearchBar = () => {
    const dateRef = useRef(null);
    const boardingRef = useRef(null);
    const destinationRef = useRef(null);
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const boarding = useSelector((state) => state.search.boarding);
    const destination = useSelector((state) => state.search.destination);
    const date = useSelector((state) => state.search.date);
    const [boardingSuggestions, setBoardingSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    //Function to keep the first letter of the input capitalized and the rest in lowercase
    const handleBoardingChange = (value) => {
        const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        dispatch(setBoarding(formatted));
    }

    const handleDestinationChange = (value) => {
        const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        dispatch(setDestination(formatted));
    }
    // Use the custom hook to determine if the screen width is less than 768px
    const isMobile = useMediaQuery('(max-width: 767px)');

    //Debounce function to fetch suggestions for boarding points
    useEffect(() => {
        if (!boarding || boarding.trim().length < 2) {
            setBoardingSuggestions([]);
            return;
        }
        let timeoutId = setTimeout(async () => {
            try {
                const res = await api.get('/filtered/suggestions', {
                    params: { q: boarding, type: 'boarding' },
                });
                console.log('Boarding Suggestions:', res?.data?.data?.suggestions);
                setBoardingSuggestions(res?.data?.data?.suggestions || []);
            } catch (error) {
                setBoardingSuggestions([]);
            }
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [boarding])

    //Debounce function to fetch suggestions for destination points
    useEffect(() => {
        console.log('Destination changed');
        if (!destination || destination.trim().length < 2) {
            setDestinationSuggestions([]);
            return;
        }
        let timeoutId = setTimeout(async () => {
            try {
                const res = await api.get('/filtered/suggestions', {
                    params: { q: destination, type: 'destination' },
                });
                console.log('Destination Suggestions:', res?.data?.data?.suggestions);
                setDestinationSuggestions(res?.data?.data?.suggestions || []);
            } catch (error) {
                setDestinationSuggestions([]);
            }
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [destination])

    //Mobile layout
    if (isMobile) {
        return (
            <div className="bg-white backdrop-blur-md border-t border-[#F8FAFC] shadow-xl rounded-t-2xl py-10 px-4 flex flex-col gap-3 w-full">
                <div ref={boardingRef} className="relative">
                    <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]"
                    />
                    <input
                        type="text"
                        placeholder="Boarding Point"
                        value={boarding}
                        onChange={(e) => handleBoardingChange(e.target.value)}
                        className="h-12 w-full pl-9 bg-[#F8FAFC] text-xs md:text-sm text-[#4B5563] placeholder:text-[#4B5563] border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                    {boardingSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                            {boardingSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    className="block w-full text-left px-3 py-2 text-sm hover:bg-sky-50"
                                    onClick={() => {
                                        dispatch(setBoarding(suggestion));
                                        setBoardingSuggestions([]);
                                    }}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div ref={destinationRef} className="relative">
                    <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]"
                    />
                    <input
                        type="text"
                        placeholder="Destination Point"
                        value={destination}
                        onChange={(e) => handleDestinationChange(e.target.value)}
                        className="h-12 w-full pl-9 bg-[#F8FAFC] text-xs md:text-sm text-[#4B5563] placeholder:text-[#4B5563] border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    />
                    {destinationSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                            {destinationSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    className="block w-full text-left px-3 py-2 text-sm hover:bg-sky-50"
                                    onClick={() => {
                                        dispatch(setDestination(suggestion));
                                        setDestinationSuggestions([]);
                                    }}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
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

    //Desktop layout
    return (
        <div className="bg-white/40 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 flex items-center gap-4 w-fit max-w-6xl">
            <div ref={boardingRef} className="relative flex-1">
                <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563]"
                />
                <input
                    type="text"
                    placeholder="Boarding Point"
                    value={boarding}
                    onChange={(e) => handleBoardingChange(e.target.value)}
                    className="h-14 pl-10 bg-[#F8FAFC] text-[#4B5563]  placeholder:text-[#4B5563] border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
                {boardingSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        {boardingSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                className="block w-full text-left px-3 py-2 text-sm hover:bg-sky-50"
                                onClick={() => {
                                    dispatch(setBoarding(suggestion));
                                    setBoardingSuggestions([]);
                                }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div ref={destinationRef} className="relative flex-1">
                <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563]"
                />
                <input
                    type="text"
                    placeholder="Destination Point"
                    value={destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    className="h-14 pl-10 bg-[#F8FAFC]  placeholder:text-[#4B5563] border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
                {destinationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        {destinationSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                className="block w-full text-left px-3 py-2 text-sm hover:bg-sky-50"
                                onClick={() => {
                                    dispatch(setDestination(suggestion));
                                    setDestinationSuggestions([]);
                                }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
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