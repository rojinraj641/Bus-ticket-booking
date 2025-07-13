import Navbar from "../Components/Navbar";
import PassengerInfo from "../Components/PassengerInfo";
import Footer from "../Components/Footer";
import BusLoader from "../Components/BusLoader";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { addPrice, subtractPrice } from "../Features/Seats/totalPriceSlice";

const PassengerDetails = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cancellation, setCancellation] = useState(true);
  const [loading, setLoading] = useState(false);
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const totalFare = useSelector((state) => state.totalPrice);
  const passengers = useSelector((state) => state.passengers);
  const dispatch = useDispatch();
  const prevCancellation = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (prevCancellation.current !== null) {
      if (cancellation && !prevCancellation.current) {
        dispatch(addPrice(100));
      } else if (!cancellation && prevCancellation.current) {
        dispatch(subtractPrice(100));
      }
    }
    prevCancellation.current = cancellation;
  }, [cancellation]);

  const handlePayment = async () => {
    if (!email || !phone) {
      toast.error('Please enter email and phone number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(email)) {
      toast.error('Enter a valid email');
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error('Enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/v1/passengerInfo', {
        passengers,
        email,
        phone,
      });
      navigate('/payment');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {loading && <BusLoader />}

      <main className="flex-grow w-full px-4 md:px-8 py-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Passenger Information</h1>
        <Toaster richColors />

        <div className="flex flex-wrap gap-6 mb-8">
          {selectedSeats.map((seat, index) => (
            <div key={index} className="w-full sm:w-[48%] lg:w-[32%]">
              <PassengerInfo index={index} seat={seat} />
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="w-full mt-6 bg-white border rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Contact Details</h2>
          <p className="text-sm text-gray-500 pt-3">
            Ticket will be sent to these details
          </p>
          <div className="flex flex-col pt-6 gap-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-gray-600">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm text-gray-600">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Cancellation Section */}
        <div className="bg-white border rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Cancellation</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="cancellation"
                value="yes"
                checked={cancellation === true}
                onChange={() => setCancellation(true)}
                className="accent-blue-600"
              />
              Yes, I would like to add ₹100 for free cancellation
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="cancellation"
                value="no"
                checked={cancellation === false}
                onChange={() => setCancellation(false)}
                className="accent-blue-600"
              />
              No, I will pay cancellation charges
            </label>
          </div>
        </div>

        {/* Total & Payment */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Total Amount: ₹{totalFare}</h1>
          <button
            type="button"
            className={`mt-4 md:mt-0 px-6 py-2 font-semibold rounded-md transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            disabled={loading}
            onClick={handlePayment}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PassengerDetails;
