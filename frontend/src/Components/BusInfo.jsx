import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { setBusDetails, resetBusDetails } from '../Features/Bus/selectedBusSlice';
import SeatSelection from './SeatSelection';
import axios from 'axios';

const BusInfo = () => {
    const [openBusId, setOpenBusId] = useState(null);
    const [seats, setSeats] = useState([]);
    const { boarding, destination } = useSelector((state) => state.search);
    const { busList } = useSelector((state) => state.bus);
    const dispatch = useDispatch();

    const fetchApi = async (openBusId) => {
        try {
            const res = await axios.get(`/api/v1/filtered/fetchSeats?busId=${openBusId}`);
            setSeats(res.data.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (!openBusId) return;
        fetchApi(openBusId);
        const interval = setInterval(() => {
            fetchApi(openBusId);
        }, 5000)
        return ()=>clearInterval(interval);
    }, [openBusId]);

    const handleSeatSelection = (busId, busName, boardingTime, droppingTime, busType) => {
        dispatch(resetBusDetails());

        if (openBusId === busId) {
            setOpenBusId(null);
        } else {
            dispatch(setBusDetails({ busName, boardingTime, droppingTime, busType }));
            setOpenBusId(busId);
        }
    };

    return (
        <>
            {busList.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No buses found for this route.</p>
            ) : (
                busList.map((bus) => {
                    const availableSeats = seats.filter(seat => seat.status === 'Available').length || 0;
                    const isOpen = openBusId === bus._id;

                    return (
                        <div
                            key={bus._id}
                            className="bg-gray-100 border border-gray-300 shadow-md p-6 w-full text-center rounded-t-lg overflow-y-auto mb-4"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                                <div className="flex items-center gap-1 bg-green-500 text-white py-1 px-2 rounded-md">
                                    <FontAwesomeIcon icon={faStar} />
                                    <p>{bus.ratings}</p>
                                </div>

                                {/* Price */}
                                <div className="flex-1">
                                    <p className="font-bold text-xl">₹{bus.seaterPrice}</p>
                                    <p className="text-sm text-gray-600">Onwards</p>
                                </div>

                                {/* Seat Selection */}
                                <div className="flex-1">
                                    <button
                                        className={`px-4 py-2 rounded-md text-md text-white shadow-md ${isOpen ? "bg-gray-500" : "bg-red-500"}`}
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
                                        {isOpen ? "Hide Seat" : "Select Seat"}
                                    </button>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {availableSeats} seats left
                                    </p>
                                </div>
                            </div>

                            {/* Seat Layout */}
                            {isOpen && (
                                <div className="mt-4 border-t border-gray-300 pt-4">
                                    <SeatSelection key={bus._id} seats={seats} selectedBusId={bus._id} />
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </>
    );
};

export default BusInfo;
