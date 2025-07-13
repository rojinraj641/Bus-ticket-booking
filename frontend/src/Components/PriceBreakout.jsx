import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPrice } from "../Features/Seats/totalPriceSlice.js";
import { useDispatch } from "react-redux";

const PriceBreakout = ({ seats }) => {
    const selectedSeat = useSelector((state) => state.seat.selectedSeats);
    console.log(selectedSeat);

    const baseFare = seats.reduce((total, seat) => {
        if (selectedSeat.includes(seat.seatNumber)) {
            return total + seat.basePrice;
        }
        return total;
    }, 0);

    console.log("💰 Total Fare:", baseFare);

    const convenienceFee = 25;
    const serviceTax = 45;
    const totalFare = baseFare + convenienceFee + serviceTax;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleProceedToPayment = ()=>{
        dispatch(addPrice(totalFare))
        navigate('/passengerInfo')
    }

    return (
        <>
            <div >
                <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 sticky top-4">
                    {/* Legend - Desktop */}
                    <div className="hidden lg:block mb-6">
                        <h3 className="font-semibold mb-3">Seat Legend</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <div className="w-6 h-4 bg-blue-500 mr-2 rounded"></div>
                                <span className="text-sm">Female</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-4 bg-white border border-gray-300 mr-2 rounded"></div>
                                <span className="text-sm">Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-4 bg-red-500 mr-2 rounded"></div>
                                <span className="text-sm">Male</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-4 bg-green-600 mr-2 rounded"></div>
                                <span className="text-sm">Selected</span>
                            </div>
                        </div>
                    </div>

                    {/* Journey Details */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-4">Journey Details</h3>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {/* Seat and Fare Details */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-4">Booking Summary</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Selected seats</span>
                                <span className="font-semibold text-green-600">{selectedSeat.join(' ')}</span>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm font-medium mb-2">Fare Breakdown</div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Base Price</span>
                                        <span>{baseFare}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Service Tax</span>
                                        <span>{serviceTax}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Convenience Fee</span>
                                        <span>{convenienceFee}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total Amount</span>
                                        <span>{totalFare}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md">
                        Proceed to Payment - {totalFare}
                    </button>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 mt-3 text-center">
                        By proceeding, you agree to our Terms & Conditions
                    </p>
                </div>
            </div>
        </>
    )
}

export default PriceBreakout