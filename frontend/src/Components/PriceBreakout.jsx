import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faStar,
  faMoneyBillWave,
  faReceipt,
  faCreditCard,
  faChevronDown,
  faChevronUp,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import api from "../Api/axios.api";
import { setToast, resetToast } from "../Features/Error/toastSlice.js";
import { toast } from "react-toastify";

const PriceBreakout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { seats } = useSelector((state) => state.seats);
  const { seatIds } = useSelector((state) => state.selectedSeats);
  const { busId } = useSelector((state) => state.busId);
  const { busList } = useSelector((state) => state.bus);
  const { price } = useSelector((state) => state.price);

  const bus = useMemo(
    () => busList.find((b) => b._id === busId),
    [busList, busId]
  );

  const selectedSeats = useMemo(
    () => seats.filter((s) => seatIds.includes(s._id)),
    [seats, seatIds]
  );

  const selectedSeatNumbers = selectedSeats.map((s) => s.seatNumber);

  const seatPrice = price;
  const convenienceFee = 25;
  const serviceCharge = 40;
  const ticketPrice = useMemo(
    () =>
      Math.ceil((seatPrice*selectedSeats.length) + convenienceFee + serviceCharge ),
    [seatPrice, selectedSeats]
  );

  if (seatIds.length === 0) return null;

  const handleLockSeats = async () => {
    try {
      setLoading(true);
      await api.post("/lockSeats", { seatIds });
      dispatch(resetToast());
      dispatch(setToast({ message: "Seats locked! Complete your booking.", success: true }));
      navigate("/passengerInfo");
    } catch {
      dispatch(resetToast());
      dispatch(setToast({ message: "Something went wrong while locking seats", success: false }));
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const FareRow = ({ label, value, icon, isTotal = false }) => (
    <div
      className={`flex items-center justify-between ${
        isTotal ? "text-lg font-bold text-[#111827]" : "text-sm"
      }`}
    >
      <span className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={icon}
          className={isTotal ? "text-[#2563EB]" : "text-[#9CA3AF]"}
        />
        {label}
      </span>
      <span className={isTotal ? "text-[#2563EB]" : "text-[#4B5563]"}>
        ₹{value.toLocaleString()}
      </span>
    </div>
  );

  return (
    <>
      {/* ===================== DESKTOP ===================== */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
          {/* Bus Info Header */}
          {bus && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBus}
                  className="text-[#2563EB] text-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#111827] text-base truncate">
                  {bus.busName}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <FontAwesomeIcon icon={faStar} className="text-xs text-yellow-400" />
                  <span className="text-xs text-[#4B5563]">
                    {bus.averageRating?.toFixed(1) || "N/A"}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">•</span>
                  <span className="text-xs text-[#4B5563] truncate">
                    {bus.busNumber}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Selected Seats */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
              Selected Seats
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSeatNumbers.map((sn, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                >
                  {sn}
                </span>
              ))}
            </div>
          </div>

          {/* Fare Breakdown */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
              Fare Breakdown
            </p>
            <div className="space-y-2.5">
              <FareRow
                label="Base Fare"
                value={seatPrice}
                icon={faMoneyBillWave}
              />
              <FareRow
                label="Convenience Fee"
                value={convenienceFee}
                icon={faReceipt}
              />
              <FareRow
                label="Service Tax"
                value={serviceCharge}
                icon={faCreditCard}
              />
              <div className="border-t border-slate-200 my-2" />
              <FareRow
                label="Total Amount"
                value={ticketPrice}
                icon={faCheckCircle}
                isTotal
              />
            </div>
          </div>

          {/* Payment Info */}
          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-[#4B5563]">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
              <span>
                {seatIds.length} berth{seatIds.length > 1 ? "s" : ""} selected
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleLockSeats}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? "bg-slate-300 cursor-not-allowed text-slate-500"
                : "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:scale-[1.02]"
            }`}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                Proceed to Payment
                <FontAwesomeIcon icon={faCreditCard} className="text-xs" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===================== MOBILE ===================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        {/* Expandable Sheet */}
        <div
          className={`
            bg-white border-t-2 border-blue-500
            transition-all duration-300
            ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
            overflow-hidden
          `}
        >
          <div className="px-4 py-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Seats</span>
              <span className="font-medium text-[#111827]">{seatIds.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Base Fare</span>
              <span>₹{seatPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Service Tax</span>
              <span>₹{serviceCharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Convenience Fee</span>
              <span>₹{convenienceFee}</span>
            </div>
            <hr className="my-2 border-slate-200" />
            <div className="flex justify-between font-semibold">
              <span className="text-[#111827]">Total</span>
              <span className="text-[#2563EB]">₹{price}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="text-slate-400 hover:text-[#2563EB] transition-colors"
            >
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                className="text-xs"
              />
            </button>
            <div>
              <p className="text-xs text-slate-500">Total Fare</p>
              <p className="font-semibold text-lg text-[#111827]">
                ₹{ticketPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              loading
                ? "bg-slate-300 cursor-not-allowed text-slate-500"
                : "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:shadow-[0_4px_14px_rgba(37,99,235,0.4)] active:scale-95"
            }`}
            onClick={handleLockSeats}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceBreakout;
