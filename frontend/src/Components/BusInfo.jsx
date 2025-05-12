import React from 'react';
import SeatSelection from './SeatSelection';

const BusInfo = () => {
    return (
        <>
            <div className="bg-gray-100 border shadow-md p-6 w-full text-center rounded-t-lg overflow-y-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Operator Info */}
                    <div className="flex-1">
                        <h3 className="font-bold text-xl">JSR Roadlinks</h3>
                        <p className="text-sm text-gray-600">AC Sleeper</p>
                    </div>

                    {/* Departure */}
                    <div className="flex-1">
                        <h3 className="font-bold text-xl">22:20</h3>
                        <p className="text-sm text-gray-600">Kalamassery</p>
                    </div>

                    {/* Duration */}
                    <div className="flex-1">
                        <h3 className="font-bold text-xl">8hr 48min</h3>
                    </div>

                    {/* Arrival */}
                    <div className="flex-1">
                        <h3 className="font-bold text-xl">7:20</h3>
                        <p className="text-sm text-gray-600">Madiwala</p>
                    </div>

                    {/* Rating */}
                    <div className="flex-1">
                        <p className="font-bold">Rating</p>
                    </div>

                    {/* Price */}
                    <div className="flex-1">
                        <p className="font-bold text-xl">$200</p>
                        <p className="text-sm text-gray-600">Offer available</p>
                    </div>

                    {/* Seat Selection */}
                    <div className="flex-1">
                        <button className="bg-red-500 shadow-md text-white px-4 py-2 rounded-md text-md">
                            Select Seat
                        </button>
                        <p className="text-sm text-gray-600">18 seats left</p>
                    </div>
                </div>
            </div>
            <div className="w-full border border-black shadow-md">
                <SeatSelection />
            </div>

        </>
    )
}

export default BusInfo
