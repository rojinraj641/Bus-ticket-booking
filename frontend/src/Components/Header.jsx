import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faLocationDot, faRepeat, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBoarding, setDestination, setDate } from '../Features/Search/searchSlice.js';
import { setBusList, removeBusList } from '../Features/Bus/busSlice.js';
import { useState, useEffect, useRef } from 'react';
import api from "../Api/axios.api.js";
import { setToast, resetToast } from '../Features/Error/toastSlice.js';
import { formatTimeRange } from "../utils/timeRangeUtils.js";

const Header = () => {
  const destinationRef = useRef(null);
  const boardingRef = useRef(null);
  const dispatch = useDispatch();
  const { boarding, destination, date } = useSelector((state) => state.search);
  const { departureTime, arrivalTime, busType, amenities } = useSelector((state) => state.filters);
  const [swapAnimate, setSwapAnimate] = useState(false);
  const [boardingSuggestions, setBoardingSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    if (!boarding || !destination || !date) {
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearchClick();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [boarding, destination, date, departureTime, arrivalTime, amenities, busType]);

  useEffect(() => {
    if (!boarding || boarding.trim().length < 2) {
      setBoardingSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const res = await api.get('/filtered/suggestions', {
          params: { q: boarding, type: 'boarding' },
        });
        setBoardingSuggestions(res?.data?.data?.suggestions || []);
      } catch (error) {
        setBoardingSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [boarding]);

  useEffect(() => {
    if (!destination || destination.trim().length < 2) {
      setDestinationSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const res = await api.get('/filtered/suggestions', {
          params: { q: destination, type: 'destination' },
        });
        setDestinationSuggestions(res?.data?.data?.suggestions || []);
      } catch (error) {
        setDestinationSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        boardingRef.current &&
        !boardingRef.current.contains(event.target)
      ) {
        setBoardingSuggestions([]);
      }

      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setDestinationSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBoardingPoint = (value) => {
    const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    dispatch(setBoarding(formatted));
  };

  const handleDestinationPoint = (value) => {
    const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    dispatch(setDestination(formatted));
  };

  const handleDate = (value) => {
    dispatch(setDate(value));
  };

  const handleSwap = () => {
    setSwapAnimate(true);
    dispatch(setBoarding(destination));
    dispatch(setDestination(boarding));
    setTimeout(() => setSwapAnimate(false), 300);
  };

  const handleSearchClick = async () => {
    dispatch(resetToast());
    try {
      const departureTimeRanges = (departureTime || [])
        .map(formatTimeRange)
        .filter(Boolean);
      const arrivalTimeRanges = (arrivalTime || [])
        .map(formatTimeRange)
        .filter(Boolean);

      const res = await api.get('/filtered', {
        params: {
          boarding,
          destination,
          date,
          arrivalTime: arrivalTimeRanges.length > 0 ? arrivalTimeRanges.join(',') : null,
          departureTime: departureTimeRanges.length > 0 ? departureTimeRanges.join(',') : null,
          amenities: amenities || [],
          busType: busType || [],
        }
      });
      const { busList } = res.data.data;
      dispatch(removeBusList());
      dispatch(setBusList(busList));
    } catch (err) {
      dispatch(setToast("Something went wrong"));
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-center gap-3 border-b border-blue-100 bg-gradient-to-r from-[#F8FAFC] via-[#EFF6FF] to-[#F8FAFC] px-4 py-4 shadow-[0_10px_30px_rgba(37,99,235,0.08)] sm:px-6 sm:py-5">
      {/* Mobile Layout */}
      <div className="flex w-full flex-col gap-3 rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-[0_8px_24px_rgba(148,163,184,0.18)] backdrop-blur-sm sm:hidden">
        <div ref={boardingRef} className="relative">
          <div className="flex items-center rounded-xl border border-blue-100 bg-[#F8FAFC] px-3 py-2.5 transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faBusSimple} className="mr-2 text-[#2563EB]" />
            <input
              type="text"
              placeholder="Boarding Point"
              value={boarding}
              onChange={(e) => handleBoardingPoint(e.target.value)}
              className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#4B5563] outline-none"
            />
          </div>
          {boardingSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg">
              {boardingSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-[#111827] transition hover:bg-blue-50 last:border-b-0"
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

        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={handleSwap}
            aria-label="Swap Locations"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-white text-[#2563EB] shadow-sm transition hover:bg-blue-50"
          >
            <FontAwesomeIcon icon={faRepeat} className={`transition-transform ${swapAnimate ? 'animate-rotate-once' : ''}`} />
          </button>
        </div>

        <div ref={destinationRef} className="relative">
          <div className="flex items-center rounded-xl border border-blue-100 bg-[#F8FAFC] px-3 py-2.5 transition focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#2563EB]" />
            <input
              type="text"
              placeholder="Destination Point"
              value={destination}
              onChange={(e) => handleDestinationPoint(e.target.value)}
              className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#4B5563] outline-none"
            />
          </div>
          {destinationSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg">
              {destinationSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-[#111827] transition hover:bg-blue-50 last:border-b-0"
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
      </div>

      {/* Desktop Layout */}
      <div ref={boardingRef} className="relative hidden h-12 items-center rounded-2xl border border-blue-100 bg-white pl-4 pr-2 shadow-[0_8px_24px_rgba(148,163,184,0.14)] sm:flex">
        <FontAwesomeIcon icon={faBusSimple} className="mr-2 text-[#2563EB]" />
        <input
          type="text"
          placeholder="Boarding Point"
          value={boarding}
          onChange={(e) => handleBoardingPoint(e.target.value)}
          className="w-40 bg-transparent text-sm text-[#111827] placeholder:text-[#4B5563] outline-none"
        />
        {boardingSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg">
            {boardingSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-[#111827] transition hover:bg-blue-50 last:border-b-0"
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

      <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-[0_8px_24px_rgba(148,163,184,0.14)] sm:flex">
        <button onClick={handleSwap} aria-label="Swap Locations" className="flex h-9 w-9 items-center justify-center rounded-full text-[#2563EB] transition hover:bg-blue-50">
          <FontAwesomeIcon icon={faRepeat} className={`transition-transform ${swapAnimate ? 'animate-rotate-once' : ''}`} />
        </button>
      </div>

      <div ref={destinationRef} className="relative hidden h-12 items-center rounded-2xl border border-blue-100 bg-white pl-4 pr-2 shadow-[0_8px_24px_rgba(148,163,184,0.14)] sm:flex">
        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#2563EB]" />
        <input
          type="text"
          placeholder="Destination Point"
          value={destination}
          onChange={(e) => handleDestinationPoint(e.target.value)}
          className="w-40 bg-transparent text-sm text-[#111827] placeholder:text-[#4B5563] outline-none"
        />
        {destinationSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg">
            {destinationSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-[#111827] transition hover:bg-blue-50 last:border-b-0"
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

      {/* Date Picker */}
      <div className="flex h-12 w-full items-center rounded-2xl border border-blue-200 bg-white px-3 shadow-[0_8px_24px_rgba(148,163,184,0.14)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.18)] sm:w-auto">
        <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-[#2563EB]" />
        <Datepicker
          calendarIcon={null}
          clearIcon={null}
          format="dd-MM-y"
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
          value={date}
          onChange={(date) => handleDate(date)}
          className="text-sm font-medium text-[#111827] focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <button
        className="h-12 w-full rounded-2xl bg-[#2563EB] px-6 font-semibold text-white shadow-[0_12px_25px_rgba(37,99,235,0.35)] transition hover:bg-[#1D4ED8] sm:w-auto"
        onClick={handleSearchClick}
      >
        Search Buses
      </button>
    </header>
  );
};

export default Header;

