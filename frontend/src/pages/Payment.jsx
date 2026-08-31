import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import PaymentMethods from '../Components/PaymentMethods';
import BookingDetails from '../Components/BookingDetails';
import { ArrowRight, Clock, ShieldCheck, TimerOff, CreditCard, Lock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SessionExpiredRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 text-center px-4">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <TimerOff className="w-9 h-9 text-red-500" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
        Session Expired
      </h1>
      <p className="text-base sm:text-lg text-slate-500 font-medium">
        Redirecting you to the home page...
      </p>
      <div className="mt-6 w-40 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-red-400 rounded-full animate-[shrink_2s_linear_forwards]" />
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

const Payment = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const boarding = useSelector((state) => state.search.boarding);
  const destination = useSelector((state) => state.search.destination);
  const seatLockTime = useSelector((state) => state.seatLockTime);

  useEffect(() => {
    if (!seatLockTime) return;

    const timer = setInterval(() => {
      const remaining = seatLockTime - Date.now();

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [seatLockTime]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const handleProceedToPay = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    alert(`Proceeding to pay with ${selectedPaymentMethod}`);
  };

  if (isSessionExpired) {
    return <SessionExpiredRedirect />;
  }

  const isUrgent = timeLeft <= 120;

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-[#F8FAFC]">
        {/* Header */}
        <header className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-100" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-blue-200 font-semibold uppercase tracking-wider mb-0.5">
                    Secure Checkout
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold">
                    <span className="truncate">{boarding}</span>
                    <ArrowRight className="w-4 h-4 text-blue-300 shrink-0" />
                    <span className="truncate">{destination}</span>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm transition-all duration-300 ${isUrgent
                    ? "bg-red-500/90 text-white shadow-red-500/30 animate-pulse"
                    : "bg-white/10 text-white border border-white/15 shadow-blue-900/20"
                  }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span className="flex items-center gap-1.5">
                  {timeLeft > 0 ? (
                    <>
                      <Lock className="w-3 h-3 opacity-70" />
                      <span className="font-mono tabular-nums">Time left: {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}</span>
                    </>
                  ) : (
                    "Time expired"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="py-6 sm:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full lg:w-5/12 xl:w-5/12">
              <PaymentMethods
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
                onProceedToPay={handleProceedToPay}
              />
            </div>

            <div className="w-full lg:w-7/12 xl:w-7/12">
              <BookingDetails />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Payment;