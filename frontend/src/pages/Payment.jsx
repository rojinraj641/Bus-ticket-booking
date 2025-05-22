import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CouponSection from '../Components/CouponSection';
import PaymentMethods from '../Components/PaymentMethods';
import BookingDetails from '../Components/BookingDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';

function Payment() {
    const [timeLeft, setTimeLeft] = useState(600);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const formatTime = (seconds) => {
        if (seconds <= 0) return "Time expired";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')} min`;
    };

    const bookingData = {
        route: {
            from: 'Ernakulam',
            to: 'Bangalore',
        },
        bus: {
            name: 'JSR Roadways',
            type: 'AC Sleeper',
        },
        journey: {
            departure: {
                time: '22:30',
                date: 'March 21',
                location: 'Kalamassery',
            },
            arrival: {
                time: '07:30',
                date: 'March 22',
                location: 'Madiwala',
            },
        },
        passenger: {
            name: 'Rojin Raj',
            details: '(23,M)',
        },
        fare: {
            baseFare: 1100,
            cancellationFee: 100,
            couponDiscount: 200,
            total: 1000,
        },
    };

    const availableCoupons = [
        { id: 1, value: 'Rs 100 off on first booking', code: 'WELCOME100' },
        { id: 2, value: 'Rs 100 off on first booking', code: 'WELCOME100' },
        { id: 3, value: 'Rs 100 off on first booking', code: 'WELCOME100' },
        { id: 4, value: 'Rs 100 off on first booking', code: 'WELCOME100' },
        { id: 5, value: 'Rs 100 off on first booking', code: 'WELCOME100' },
    ];

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleApplyCoupon = (coupon) => {
        setAppliedCoupon(coupon);
        alert(`Coupon ${coupon.code} applied!`);
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

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full bg-gray-50">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-5">
                    <div className="max-w-7xl w-full mx-auto px-4 flex justify-between items-center">
                        <div className="text-base md:text-lg font-semibold flex items-center gap-2">
                            {bookingData.route.from} <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffffff", }} className="px-5" /> {bookingData.route.to}
                        </div>
                        <div className=" bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <FontAwesomeIcon icon={faClock} style={{ color: "#ffffff", }} className="pt-1" />
                            {timeLeft > 0 ? `Pay within ${formatTime(timeLeft)}` : 'Time expired'}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main>
                    <div  className="flex flex-row">
                        {/* Left side: Coupons + Payment */}
                        <div className="flex flex-col gap-10 py-5 pl-10">
                            <CouponSection
                                coupons={availableCoupons}
                                onApplyCoupon={handleApplyCoupon}
                                appliedCoupon={appliedCoupon}
                            />
                            <PaymentMethods
                                selectedMethod={selectedPaymentMethod}
                                onMethodChange={handlePaymentMethodChange}
                                onProceedToPay={handleProceedToPay}
                            />
                        </div>

                        {/* Right side: Booking Details */}
                        <div className="w-full py-5 px-10">
                            <BookingDetails
                                busDetails={bookingData.bus}
                                journey={bookingData.journey}
                                passenger={bookingData.passenger}
                                fare={bookingData.fare}
                            />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default Payment;
