import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import SeatSelection from './SeatSelection';

const BusInfo = () => {
    const { boarding, destination } = useSelector((state) => state.search);
    const { busList } = useSelector((state) => state.bus);
    const { loading } = useSelector((state) => state.bus.loading)
    const [open, setOpen] = useState(false);

    return (
        <>
            {busList.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No buses found for this route.</p>
            ) : (
                busList.map((bus) => {
                    return (
                        <div
                            key={bus._id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all mb-5"
                        >
                            {/* Top Section */}
                            <div className="p-5 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">

                                {/* Operator */}
                                <div className="md:col-span-2 text-center md:text-left">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {bus.busName}
                                    </h3>

                                    <div className="flex justify-center md:justify-start gap-2 mt-1">
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                            {bus.isACAvailable ? 'AC' : 'Non-AC'}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                            {bus.busType}
                                        </span>
                                    </div>
                                </div>

                                {/* Departure */}
                                <div className="text-center">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {bus.boardingTime}
                                    </p>
                                    <p className="text-xs text-gray-500">{boarding}</p>
                                </div>

                                {/* Duration */}
                                <div className="text-center text-gray-600 font-medium">
                                    {bus.duration}
                                </div>

                                {/* Arrival */}
                                <div className="text-center">
                                    <p className="text-lg font-semibold text-gray-800">{bus.tripEndingTime}</p>
                                    <p className="text-xs text-gray-500">{destination}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex justify-center">
                                    <div className="flex items-center gap-1 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                                        <FontAwesomeIcon icon={faStar} />
                                        <span>{bus.ratings}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200" />

                            {/* Bottom Section */}
                            <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4">

                                {/* Price */}
                                <div className="text-center md:text-left">
                                    <p className="text-xl font-bold text-gray-800">₹100</p>
                                    <p className="text-xs text-gray-500">Onwards</p>
                                </div>

                                {/* Seats + CTA */}
                                <div className="flex flex-col items-center md:items-end gap-1">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className={`px-6 py-2 rounded-lg text-white font-medium transition-all
        ${open ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'}`}
                                    >
                                        {open ? 'Hide Seats' : 'Select Seats'}
                                    </button>

                                    <p className="text-xs text-gray-500">Seats left</p>
                                </div>
                            </div>

                            {/* Seat Layout */}
                            {open && (
                                <div className="border-t border-gray-200 p-5 bg-gray-50 rounded-b-xl">
                                    <SeatSelection selectedBusId={bus._id} />
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
