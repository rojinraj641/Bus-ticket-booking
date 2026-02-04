import { useSelector } from "react-redux";
import { useState } from "react";

const PriceBreakout = () => {
  const { seatIds } = useSelector((state) => state.selectedSeats);

  const baseFare = 800;
  const convenienceFee = 25;
  const serviceTax = 45;
  const totalFare = baseFare + convenienceFee + serviceTax;

  const [open, setOpen] = useState(false);

  if (seatIds.length === 0) return null;

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
          <h3 className="font-semibold mb-4">Booking Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Seats Selected</span>
              <span className="font-semibold text-green-600">
                {seatIds.length}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mt-3">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Tax</span>
                <span>₹{serviceTax}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalFare}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold">
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
                <span>₹{baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Tax</span>
                <span>₹{serviceTax}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalFare}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="bg-white border-t flex items-center justify-between p-4">
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <p className="text-xs text-gray-500">Total Fare</p>
            <p className="font-semibold">₹{totalFare}</p>
          </div>

          <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold">
            Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceBreakout;
