import { useSelector } from "react-redux";
import { Bus, IndianRupee, User, Clock, MapPin, Tag, PartyPopper, Users, ShieldCheck } from "lucide-react";
import { useState } from 'react';

const BookingDetails = ({totalPrice}) => {
  const CONVENIENCE_FEE = 25;
  const SERVICE_TAX = 40;
  const CANCELLATION_PRICE = 100;
  const bus = useSelector((state) => state.bus.busList);
  const busId = useSelector((state) => state.busId);
  const selectedBus = bus.filter((b) => b._id == busId.busId);
  const boarding = useSelector((state) => state.search.boarding);
  const destination = useSelector((state) => state.search.destination);
  const cancellation = useSelector((state) => state.cancellation);
  const passenger = useSelector((state) => state.passengers);
  const { price } = useSelector((state) => state.price);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);
  //const coupons = useSelector((state) => state.selectedCoupons);

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 w-full overflow-hidden">
      {/* Bus Info Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] px-5 sm:px-7 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10">
              <Bus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {selectedBus.busName}
              </h3>
              <p className="text-xs text-blue-100 mt-0.5">{selectedBus.busType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-50 bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/10">
            <span className="font-medium truncate">{boarding}</span>
            <span className="text-blue-200">→</span>
            <span className="font-medium truncate">{destination}</span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-5 sm:space-y-6">
        {/* Boarding and Dropping Points */}
        <div className="pb-5 sm:pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wide">Journey Route</h4>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-blue-50" />
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-slate-300 relative">
              <Bus className="w-7 h-5 text-[#2563EB] absolute -top-[7px] left-1/2 -translate-x-1/2 bg-white p-0.5 rounded-full" />
            </div>
            <div className="flex flex-col items-center shrink-0">
              <div className="w-3 h-3 rounded-full bg-slate-400 ring-4 ring-slate-50" />
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#111827]">{boarding}</span>
              <span className="text-xs text-[#4B5563] flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {selectedBus[0].departureTime}
              </span>
              <span className="text-xs text-[#4B5563] flex items-center gap-1 mt-0.5">
                {new Date(
                  selectedBus[0].departureDateTime
                ).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-[#111827]">{destination}</span>
              <span className="text-xs text-[#4B5563] flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {selectedBus[0].arrivalTime}
              </span>
              <span className="text-xs text-[#4B5563] flex items-center gap-1 mt-0.5">
                {new Date(
                  selectedBus[0].arrivalDateTime
                ).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="pb-5 sm:pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-[#2563EB]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wide">
              Passenger{passenger.length > 1 ? "s" : ""} ({passenger.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {passenger.map((p, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm shadow-blue-200">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#111827] truncate">{p.name}</p>
                  <p className="text-xs text-[#4B5563]">{p.gender}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5 text-[#2563EB]" />
            </div>
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wide">Fare Details</h4>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-[#4B5563]">
              <span>Total Fare</span>
              <span className="font-semibold text-[#111827]">₹{price}</span>
            </div>
            <div className="flex justify-between text-[#4B5563]">
              <span>Convenience Fee</span>
              <span className="font-medium text-[#111827]">₹{CONVENIENCE_FEE}</span>
            </div>
            <div className="flex justify-between text-[#4B5563]">
              <span>Service Tax</span>
              <span className="font-medium text-[#111827]">₹{SERVICE_TAX}</span>
            </div>

            {cancellation && (
              <div className="flex justify-between text-[#4B5563]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  Cancellation Protection
                </span>
                <span className="font-semibold text-[#111827]">₹{CANCELLATION_PRICE}</span>
              </div>
            )}

            {isCouponAvailable && (
              <div className="flex justify-between text-[#16A34A]">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Coupon Applied
                </span>
                <span className="font-semibold">-₹</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-dashed border-slate-200">
              <span className="text-base font-bold text-[#111827]">Total Amount</span>
              <span className="text-xl font-bold text-[#2563EB]">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          {isCouponAvailable && (
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-[#16A34A] font-semibold rounded-xl p-3.5 text-center mt-5 text-sm border border-green-100">
              <PartyPopper className="w-4 h-4 shrink-0" />
              You saved ₹{coupons[0]?.discountAmount} on this booking
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;