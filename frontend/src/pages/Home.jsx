import axios from "axios";
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HomeCard from '../Components/HomeCard';
import OfferCard from '../Components/OfferCard';
import { useDispatch } from "react-redux";
import { login } from "../Features/User/authSlice.js";
import { setUserDetails } from "../Features/User/userSlice.js";

const Home = () => {
  const [route, setRoute] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
      const token = localStorage.getItem("token");
      const phone = localStorage.getItem('phone');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      if (token) {
        dispatch(login(token));
        dispatch(setUserDetails({phone,name,email}))
      }
    }, [dispatch]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/");
        setRoute(res.data.message.topRoute);
        setCoupon(res.data.message.coupons);
        console.log(res.data.message.coupons);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Header />

      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-16">
        {/* Top Travelled Bus Routes */}
        <section aria-label="Top Travelled Bus Routes" className="mb-16">
          <h3 className="text-gray-900 text-center font-bold text-2xl sm:text-3xl mb-10">
            Top Travelled Bus Routes
          </h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {route.map((element, index) => (
              <HomeCard key={index} title={`From ${element.from} to ${element.to}`} />
            ))}
          </div>
        </section>

        {/* Offers Section */}
        <section
          aria-label="Bus Ticket Offers and Deals"
          className="bg-white rounded-2xl mx-auto w-full sm:w-11/12 max-w-7xl border border-gray-200 shadow-lg p-6 sm:p-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-gray-900 font-semibold mb-8">
            Bus Ticket Offers and Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {coupon.map((element, index) => (
              <OfferCard key={index} offer={element.couponCode} text={element.description} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
