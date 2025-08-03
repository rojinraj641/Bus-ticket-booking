import SeatSelection from './SeatSelection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setBusDetails, resetBusDetails } from '../Features/Bus/selectedBusSlice';

const BusInfo = () => {
    const [openBusId, setOpenBusId] = useState(null);
    const [seats, setSeats] = useState([]);
    const { boarding, destination } = useSelector((state) => state.search)
    const { busList } = useSelector((state) => state.bus);
    const dispatch = useDispatch();
    const handleSeatSelection = (busId, busName, boardingTime, droppingTime, busType) => {
        dispatch(resetBusDetails())
        if (openBusId === busId) {
            setOpenBusId(null);
        } else {
            dispatch(setBusDetails({ busName, boardingTime, droppingTime, busType }))
            setOpenBusId(busId);
            const selectedBus = busList.find(bus => bus._id === busId);
            setSeats(selectedBus?.seats || []);
        }
    }

    return (
        <>
            {busList.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No buses found for this route.</p>
            ) : (
                busList.map((bus) => (
                    <div key={bus._id} className="bg-gray-100 border border-gray-300 shadow-md p-6 w-full text-center rounded-t-lg overflow-y-auto">
                        <div className="flex flex-col md:flex-row md:items-center">
                            {/* Operator Info */}
                            <div className="flex-1">
                                <h3 className="font-bold text-xl">{bus.busName}</h3>
                                <p className="text-sm text-gray-600">{bus.busType}</p>
                            </div>

                            {/* Departure */}
                            <div className="flex-1">
                                <h3 className="font-bold text-xl">{bus.boardingTime}</h3>
                                <p className="text-sm text-gray-600">{boarding}</p>
                            </div>

                            {/* Duration */}
                            <div className="flex-1">
                                <h3 className="font-bold text-xl">{bus.travellingTime}</h3>
                            </div>

                            {/* Arrival */}
                            <div className="flex-1">
                                <h3 className="font-bold text-xl">{bus.tripEndingTime}</h3>
                                <p className="text-sm text-gray-600">{destination}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex flex-wrap py-1 px-2 rounded-md bg-green-500">
                                <FontAwesomeIcon icon={faStar} style={{ color: "#ffffff", }} className="pt-1 size-xs" />
                                <p className="text-white pl-1">{bus.ratings}</p>
                            </div>

                            {/* Price */}
                            <div className="flex-1">
                                <p className="font-bold text-xl">₹{bus.seaterPrice}</p>
                                <p className="text-sm text-gray-600">Onwards</p>
                            </div>

                            {/* Seat Selection */}
                            <div className="flex-1">
                                <button
                                    className={
                                        openBusId
                                            ? "bg-gray-500 text-white px-4 py-2 rounded-md text-md"
                                            : "bg-red-500 shadow-md text-white px-4 py-2 rounded-md text-md"
                                    }
                                    onClick={() =>
                                        handleSeatSelection(
                                            bus._id,
                                            bus.busName,
                                            bus.boardingTime,
                                            bus.tripEndingTime,
                                            bus.busType
                                        )
                                    }
                                >
                                    {openBusId ? "Hide Seat" : "Select Seat"}
                                </button>

                                <p className="text-sm text-gray-600">{bus.seats.filter((seat) => !seat.isBooked).length} seats left</p>
                            </div>
                        </div>
                    </div>
                )))}
            {openBusId && (
                <div className="w-full border border-gray-300 shadow-md">
                    <SeatSelection seats={seats} selectedBusId={openBusId} />
                </div>
            )}
        </>
    )
}

export default BusInfo
