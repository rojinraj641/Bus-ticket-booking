import Navbar from "../Components/Navbar";
import PassengerInfo from "../Components/PassengerInfo";
import Footer from "../Components/Footer";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { addContactDetails } from "../Features/Ticket/contactSlice";
import { User, Mail, Phone, ShieldCheck, ChevronRight, CreditCard } from "lucide-react";

const STEPS = [
  { id: 1, label: "Select Seats", icon: User, path: '/filtered' },
  { id: 2, label: "Passenger Info", icon: User, path: '/passengerInfo' },
  { id: 3, label: "Payment", icon: CreditCard, path: '/payment' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const PassengerDetails = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cancellation, setCancellation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { seatIds } = useSelector((state) => state.selectedSeats);
  const { seats } = useSelector((state) => state.seats);
  const { price } = useSelector((state) => state.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive current step from the actual route instead of separate local state
  const currentStepId = STEPS.find((s) => s.path === location.pathname)?.id ?? 2;

  const selectedSeats = useMemo(
    () => seats.filter((s) => seatIds.includes(s._id)),
    [seats, seatIds]
  );

  const convenienceFee = 25;
  const serviceCharge = 40;
  const cancellationCharge = 100;
  const totalAmount = useMemo(
    () => Math.ceil((price * selectedSeats.length) + convenienceFee + serviceCharge + (cancellation?cancellationCharge:0)),
    [price, selectedSeats.length, cancellation]
  );

  const goToStep = (step) => {
    // Only allow navigating back to a step already passed, not skipping ahead
    if (step.id < currentStepId) {
      navigate(step.path);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!EMAIL_REGEX.test(email)) newErrors.email = "Enter a valid email address";
    if (!PHONE_REGEX.test(phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      dispatch(addContactDetails({ email, phone }));
      navigate("/payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 mx-auto max-w-7xl">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((step, idx) => {
              const isActive = step.id === currentStepId;
              const isClickable = step.id < currentStepId;
              return (
                <div key={step.id} className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => goToStep(step)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#2563EB] text-white shadow-md shadow-blue-200"
                        : isClickable
                        ? "bg-white text-slate-500 border border-slate-200 hover:border-slate-300 cursor-pointer"
                        : "bg-white text-slate-300 border border-slate-100 cursor-not-allowed"
                    }`}
                  >
                    <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Passenger Forms */}
          <div className="xl:col-span-2 space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">Passenger Information</h1>
              <p className="text-sm text-slate-500">Please fill in the details for all passengers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSeats.map((seat, index) => (
                <PassengerInfo key={seat._id} index={index} seatNumber={seat.seatNumber} seatId={seat._id} />
              ))}
            </div>
          </div>

          {/* Right Column - Contact & Cancellation */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                </div>
                <h2 className="text-base font-semibold text-slate-800">Contact Details</h2>
              </div>
              <p className="text-xs text-slate-500 mb-5 ml-10">Ticket will be sent to these details</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Cancellation Section — unchanged */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-base font-semibold text-slate-800">Cancellation Policy</h2>
              </div>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  cancellation === true ? "border-[#2563EB] bg-blue-50/50" : "border-slate-200 hover:border-slate-300 bg-white"
                }`}>
                  <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    cancellation === true ? "border-[#2563EB]" : "border-slate-300"
                  }`}>
                    {cancellation === true && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                  </span>
                  <input type="radio" name="cancellation" checked={cancellation === true} onChange={() => setCancellation(true)} className="sr-only" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">Add Free Cancellation</span>
                    <p className="text-xs text-slate-500 mt-0.5">Pay ₹{cancellationCharge} extra for hassle-free cancellation</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  cancellation === false ? "border-[#2563EB] bg-blue-50/50" : "border-slate-200 hover:border-slate-300 bg-white"
                }`}>
                  <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    cancellation === false ? "border-[#2563EB]" : "border-slate-300"
                  }`}>
                    {cancellation === false && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                  </span>
                  <input type="radio" name="cancellation" checked={cancellation === false} onChange={() => setCancellation(false)} className="sr-only" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">No Cancellation Cover</span>
                    <p className="text-xs text-slate-500 mt-0.5">Standard cancellation charges will apply</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Payment Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-xs text-slate-500">Total Amount</p>
              <p className="font-bold text-lg text-slate-800">₹{totalAmount.toLocaleString()}</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={handlePayment}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                loading ? "bg-slate-300 cursor-not-allowed text-slate-500"
                : "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:shadow-[0_4px_14px_rgba(37,99,235,0.4)] active:scale-95"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>

        {/* Desktop Total & Payment */}
        <div className="hidden lg:flex flex-col sm:flex-row justify-between items-center mt-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Amount</p>
            <h1 className="text-2xl font-bold text-slate-800">₹{totalAmount.toLocaleString()}</h1>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={handlePayment}
            className={`mt-4 sm:mt-0 px-8 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
              loading ? "bg-slate-300 cursor-not-allowed text-slate-500"
              : "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:scale-[1.01]"
            }`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
            <CreditCard className="w-4 h-4" />
          </button>
        </div>

        <div className="h-20 lg:hidden" />
      </main>

      <Footer />
    </div>
  );
};

export default PassengerDetails;