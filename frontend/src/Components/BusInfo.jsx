import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import SeatSelection from './SeatSelection';
import { setBusId, resetBusId } from '../Features/Bus/busIdSlice';

const BusInfo = () => {
  const dispatch = useDispatch();

  const { boarding, destination } = useSelector((state) => state.search);
  const { busList } = useSelector((state) => state.bus);
  const { seats } = useSelector((state) => state.seats);

  const [openBusId, setOpenBusId] = useState(null);

  const handleToggleSeats = (busId) => {
    setOpenBusId((prev) => {
      if (prev === busId) {
        dispatch(resetBusId());
        return null;
      } else {
        dispatch(setBusId(busId));
        return busId;
      }
    });
  };

  if (busList.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No buses found for this route.
      </p>
    );
  }

  return (
    <>
      {busList.map((bus) => {
        const busSeats = seats.filter((s) => s.busId === bus._id);
        const availableSeats = busSeats.filter(
          (s) => s.status === 'Available'
        );

        const basePrice = busSeats.length
          ? Math.min(...busSeats.map((s) => s.basePrice))
          : 'N/A';

        const isOpen = openBusId === bus._id;

        return (
          <div
            key={bus._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm mb-4"
          >
            {/* TOP SECTION */}
            <div className="p-4 md:p-5 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-center">
              {/* Operator */}
              <div className="col-span-2 md:col-span-2 text-center md:text-left">
                <h3 className="font-semibold text-base md:text-lg text-gray-800">
                  {bus.busName}
                </h3>

                <div className="flex justify-center md:justify-start gap-2 mt-1">
                  <span className="text-[11px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                    {bus.isACAvailable ? 'AC' : 'Non-AC'}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {bus.busType}
                  </span>
                </div>
              </div>

              {/* Departure */}
              <div className="text-center">
                <p className="text-sm md:text-lg font-semibold">
                  {bus.boardingTime}
                </p>
                <p className="text-[11px] text-gray-500">{boarding}</p>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <p className="text-sm md:text-lg font-semibold">
                  {bus.tripEndingTime}
                </p>
                <p className="text-[11px] text-gray-500">{destination}</p>
              </div>

              {/* Rating */}
              <div className="hidden md:flex justify-center">
                <div className="flex items-center gap-1 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{bus.ratings}</span>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="border-t border-gray-200 p-4 md:p-5 flex flex-row md:flex-row items-center justify-between gap-3">
              {/* Price */}
              <div>
                <p className="text-lg md:text-xl font-bold text-gray-800">
                  ₹ {basePrice}
                </p>
                <p className="text-[11px] text-gray-500">Onwards</p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleToggleSeats(bus._id)}
                  className={`px-4 md:px-6 py-2 rounded-lg text-sm md:text-base text-white font-medium ${isOpen
                      ? 'bg-gray-500'
                      : 'bg-red-500 hover:bg-red-600'
                    }`}
                >
                  {isOpen ? 'Hide Seats' : 'Select Seats'}
                </button>

                <p className="text-[11px] text-gray-500 mt-1">
                  {availableSeats.length} seats left
                </p>
              </div>
            </div>

            {/* SEAT LAYOUT */}
            {isOpen && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl">
                <SeatSelection />
              </div>
            )}
          </div>
        );
      })}

    </>
  );
};

export default BusInfo;

