import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBus, faWifi, faPlug, faSnowflake, faTv, faWater, faChair } from '@fortawesome/free-solid-svg-icons';
import { setBusId, resetBusId } from '../Features/Bus/busIdSlice';
import api from '../Api/axios.api';
import { setToast, resetToast } from '../Features/Error/toastSlice.js';
import { addSeats, clearSeats } from '../Features/Seats/seatSlice.js'
import SeatSelection from './SeatSelection';

const BusInfo = () => {
  const dispatch = useDispatch();
  const { boarding, destination } = useSelector((state) => state.search);
  const { busList } = useSelector((state) => state.bus);
  const [openBusId, setOpenBusId] = useState(null);

  const handleToggleSeats = async (busId) => {
    try {
      if (openBusId !== busId) {
        const response = await api.get('/filtered/fetchSeats', {
          params: { busId }
        })
        dispatch(clearSeats());
        dispatch(addSeats(response.data.data));
      }

      setOpenBusId((prev) => {
        if (prev === busId) {
          dispatch(resetBusId());
          return null;
        } else {
          dispatch(setBusId(busId));
          return busId;
        }
      });
    } catch (error) {
      dispatch(resetToast());
      dispatch(setToast({ message: "Failed to fetch seats for selected bus", success: false }))
    }
  };

  const getAmenityIcon = (amenity) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return faWifi;
    if (lower.includes('charging') || lower.includes('usb') || lower.includes('plug')) return faPlug;
    if (lower.includes('ac') || lower.includes('air')) return faSnowflake;
    if (lower.includes('tv') || lower.includes('entertainment')) return faTv;
    if (lower.includes('water') || lower.includes('bottled')) return faWater;
    if (lower.includes('seat') || lower.includes('sleeper') || lower.includes('berth')) return faChair;
    return faBus;
  };

  const getSeatUrgency = (available, total) => {
    if (!available || !total) return { color: 'text-[#22C55E]', bg: 'bg-green-50', label: 'Available' };
    const ratio = available / total;
    if (ratio > 0.5) return { color: 'text-[#22C55E]', bg: 'bg-green-50', label: 'Available' };
    if (ratio > 0.2) return { color: 'text-[#F59E0B]', bg: 'bg-amber-50', label: 'Filling Fast' };
    return { color: 'text-[#EF4444]', bg: 'bg-red-50', label: 'Almost Full' };
  };

  if (busList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
          <FontAwesomeIcon icon={faBus} className="text-2xl text-[#2563EB]" />
        </div>
        <p className="text-center text-[#4B5563] text-base font-medium">
          No buses found for this route.
        </p>
        <p className="text-center text-gray-400 text-sm mt-1">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {busList.map((bus) => {
        const isOpen = openBusId === bus._id;
        const price = Math.floor(bus.basePrice + bus.distance * 2);
        const seatUrgency = getSeatUrgency(bus.availableSeatsCount, bus.totalSeats);

        return (
          <div
            key={bus._id}
            className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen
              ? 'border-[#2563EB] shadow-[0_8px_30px_rgba(37,99,235,0.15)]'
              : 'border-blue-100 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] hover:border-blue-200'
              }`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-center md:justify-between md:p-5 gap-4">
              {/* Operator Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faBus} className="text-[#2563EB] text-lg" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#111827] text-base truncate">
                      {bus.busName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-[#2563EB] rounded-md font-medium">
                        {bus.busNumber}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 text-[#4B5563] rounded-md">
                        {bus.busType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {bus.amenities && bus.amenities.length > 0 && (
                  <div className="flex items-center gap-3 mt-3 pl-[52px]">
                    {bus.amenities.slice(0, 4).map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-[#4B5563]"
                        title={amenity}
                      >
                        <FontAwesomeIcon icon={getAmenityIcon(amenity)} className="text-xs" />
                        <span className="text-xs hidden lg:inline">{amenity}</span>
                      </div>
                    ))}
                    {bus.amenities.length > 4 && (
                      <span className="text-xs text-[#2563EB] font-medium">
                        +{bus.amenities.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Route Timeline */}
              <div className="flex items-center gap-3 px-6">
                <div className="text-right">
                  <p className="text-lg font-bold text-[#111827]">
                    {bus.departureTime}
                  </p>
                  <p className="text-xs text-[#4B5563] mt-0.5">{boarding}</p>
                  <p className="text-xs text-[#4B5563] mt-0.5">
                    {new Date(bus.departureDateTime).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-center px-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  </div>
                  <div className="mt-1 text-center">
                    <p className="text-xs font-semibold text-[#4B5563]">{bus.distance} km</p>
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-lg font-bold text-[#111827]">
                    {bus.arrivalTime}
                  </p>
                  <p className="text-xs text-[#4B5563] mt-0.5">{destination}</p>
                  <p className="text-xs text-[#4B5563] mt-0.5">
                    {new Date(bus.arrivalDateTime).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Rating & Price & CTA */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 bg-[#22C55E] text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
                    <FontAwesomeIcon icon={faStar} className="text-xs" />
                    <span>{bus.averageRating?.toFixed(1) || 'N/A'}</span>
                  </div>
                  {bus.ratingCount > 0 && (
                    <span className="text-[10px] text-gray-400 mt-1">
                      {bus.ratingCount} ratings
                    </span>
                  )}
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="text-2xl font-bold text-[#111827]">
                    ₹{price.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#4B5563]">Onwards</p>
                  <div className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${seatUrgency.bg} ${seatUrgency.color}`}>
                    {bus.availableSeatsCount} seats left
                  </div>
                </div>

                <button
                  onClick={() => handleToggleSeats(bus._id)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${isOpen
                    ? 'bg-slate-100 text-[#4B5563] hover:bg-slate-200'
                    : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_14px_rgba(37,99,235,0.4)]'
                    }`}
                >
                  {isOpen ? 'Hide Seats' : 'Select Seats'}
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faBus} className="text-[#2563EB]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#111827] text-sm truncate">
                      {bus.busName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-[#2563EB] rounded font-medium">
                        {bus.busNumber}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-[#4B5563] rounded">
                        {bus.busType}
                      </span>
                    </div>
                  </div>
                </div>

                {bus.averageRating > 0 && (
                  <div className="flex items-center gap-1 bg-[#22C55E] text-white text-xs font-semibold px-2 py-1 rounded-lg">
                    <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                    <span>{bus.averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Route Timeline */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 mb-3">
                <div className="text-center flex-1">
                  <p className="text-base font-bold text-[#111827]">
                    {bus.departureTime}
                  </p>
                  <p className="text-xs text-[#4B5563] font-medium truncate">{boarding}</p>
                  <p className="text-xs text-[#4B5563] font-medium truncate">{new Date(bus.departureDateTime).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}</p>
                </div>

                <div className="flex flex-col items-center px-2">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <div className="w-10 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  </div>
                  <p className="text-[10px] font-semibold text-[#4B5563] mt-1">{bus.distance} km</p>
                </div>

                <div className="text-center flex-1">
                  <p className="text-base font-bold text-[#111827]">
                    {bus.arrivalTime}
                  </p>
                  <p className="text-xs text-[#4B5563] font-medium truncate">{destination}</p>
                  <p className="text-xs text-[#4B5563] font-medium truncate">{new Date(bus.arrivalDateTime).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}</p>
                </div>
              </div>

              {/* Amenities */}
              {bus.amenities && bus.amenities.length > 0 && (
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mb-3 pb-1">
                  {bus.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-slate-50 text-[#4B5563] px-2.5 py-1.5 rounded-lg whitespace-nowrap"
                    >
                      <FontAwesomeIcon icon={getAmenityIcon(amenity)} className="text-xs text-[#2563EB]" />
                      <span className="text-xs">{amenity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Row: Price, Seats, CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-blue-50">
                <div>
                  <p className="text-xl font-bold text-[#111827]">
                    ₹{price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[#4B5563]">Onwards</p>
                  <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md text-xs font-medium ${seatUrgency.bg} ${seatUrgency.color}`}>
                    {bus.availableSeatsCount} seats left
                  </div>
                </div>

                <button
                  onClick={() => handleToggleSeats(bus._id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isOpen
                    ? 'bg-slate-100 text-[#4B5563]'
                    : 'bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.4)] active:scale-95'
                    }`}
                >
                  {isOpen ? 'Hide Seats' : 'Select Seats'}
                </button>
              </div>
            </div>

            {/* Expanded Seat Selection */}
            {isOpen && (
              <div className="p-4 md:p-6">
                <SeatSelection />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BusInfo;
