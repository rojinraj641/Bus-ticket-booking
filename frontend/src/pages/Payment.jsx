import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CouponSection from '../Components/CouponSection';
import PaymentMethods from '../Components/PaymentMethods';
import BookingDetails from '../Components/BookingDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addCoupons } from '../Features/Coupons/couponSlice';
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-red-600 mb-6 animate-pulse">⏱️ Session Expired</h1>
      <p className="text-lg sm:text-xl text-gray-700 font-medium">Redirecting to the home page in 2 seconds...</p>
    </div>
  );
};

const Payment = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const boarding = useSelector((state) => state.search.boarding);
  const destination = useSelector((state) => state.search.destination);
  const dispatch = useDispatch();

  const formatTime = (seconds) => {
    if (seconds <= 0) return "Time expired";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')} min`;
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('api/v1/payment');
        const activeCoupons = response.data.data;
        setCoupons(activeCoupons);
      } catch (error) {
        console.log('An error occurred while fetching coupons');
      }
    };
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsSessionExpired(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleApplyCoupon = (coupon) => {
    dispatch(addCoupons(coupon));
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gray-50">
        <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-semibold flex items-center gap-3">
              <p>{boarding}</p>
              <FontAwesomeIcon icon={faArrowRight} className="text-white text-base" />
              <p>{destination}</p>
            </div>
            <div className="bg-blue-900 bg-opacity-30 px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm">
              <FontAwesomeIcon icon={faClock} className="text-white" />
              {timeLeft > 0 ? `Pay within ${formatTime(timeLeft)}` : 'Time expired'}
            </div>
          </div>
        </header>

        <main className="py-8">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 lg:px-8 gap-8">
            <div className="w-full lg:w-1/2 space-y-10">
              <CouponSection
                coupons={coupons}
                onApplyCoupon={handleApplyCoupon}
              />
              <PaymentMethods
                selectedMethod={selectedPaymentMethod}
                onMethodChange={handlePaymentMethodChange}
                onProceedToPay={handleProceedToPay}
              />
            </div>

            <div className="w-full lg:w-1/2">
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
