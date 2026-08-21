import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addPrice } from "../Features/Ticket/priceSlice.js";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios.api.js";
import { toast, ToastContainer} from "react-toastify"

const PriceBreakout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { seats } = useSelector((state) => state.seats);
  const { seatIds } = useSelector((state) => state.selectedSeats);

  const selectedSeats = seats.filter(s =>
    seatIds.includes(s._id)
  );

  const seatNumber = selectedSeats.map(s => s.seatNumber);

  const seatPrice = selectedSeats.reduce(
    (sum, s) => sum + Number(s.basePrice),
    0
  );

  const convinenceFee = 25;
  const serviceCharge = 40;

  const ticketPrice = Math.ceil(seatPrice + convinenceFee + serviceCharge + distance * 15);

  if (seatIds.length === 0) return null;

  const handleLockSeats = async () => {
    try{
      setLoading(true);
      dispatch(addPrice(ticketPrice));
      const res = await api.post('/lockSeats',{seatIds});
      console.log('Response from backend', res.message);
      navigate('/passengerInfo');
    }
    catch(error){
      toast.error('Something went wrong')
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
    <ToastContainer />
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
          <h3 className="font-semibold mb-4">Booking Summary</h3>
          <div className="flex flex-col gap-3 mb-9">
            <div>
              <p>Seat Legend</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className='flex flex-row gap-2'>
                <p className="bg-blue-600 w-8 h-3 rounded-xs mt-1"></p>
                <p>Male</p>
              </div>
              <div className='flex flex-row gap-2'>
                <p className="bg-pink-500 w-8 h-3 rounded-xs mt-1"></p>
                <p>Female</p>
              </div>
              <div className='flex flex-row gap-2'>
                <p className="bg-gray-400 w-8 h-3 rounded-xs mt-1"></p>
                <p>Booked</p>
              </div>
              <div className='flex flex-row gap-2'>
                <p className="bg-green-600 w-8 h-3 rounded-xs mt-1"></p>
                <p>Available</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-10">
              <span>Seats Selected</span>
              <span className="font-semibold text-green-600">
                {seatNumber + '  '}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mt-3">
              <div className="flex justify-between">
                <span className="text-semibold">Base Fare</span>
                <span>₹{seatPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Tax</span>
                <span>₹{serviceCharge}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Convenience Fee</span>
                <span>₹{convinenceFee}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{ticketPrice}</span>
              </div>
            </div>

            <button
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              onClick={() => handleLockSeats()}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Expandable Sheet */}
        {open && (
          <div className="bg-white border-t rounded-t-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Fare Breakdown</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Seats</span>
                <span>{seatIds.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Tax</span>
                <span>₹{serviceCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{ticketPrice}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="bg-white border-t flex items-center justify-between p-4">
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <p className="text-xs text-gray-500">Total Fare</p>
            <p className="font-semibold">₹{ticketPrice}</p>
          </div>

          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold"
            onClick={() => handleLockSeats()}>
            Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceBreakout;
