import axios from "axios";
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HomeCard from '../Components/HomeCard';
import OfferCard from '../Components/OfferCard';

const Home = () => {
  const [route, setRoute] = useState([]);
  const [coupon, setCoupon] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/")
      .then((res) => {
        setRoute(res.data.message.topRoute);
        setCoupon(res.data.message.coupons)
        console.log(res.data.message.coupons);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }, [])

  return (
    <>
      <Navbar />
      <Header />
      {/* Overlay for better readability */}
      <div className=" bg-opacity-60 w-full h-full py-13 px-4">
        {/* Top Travelled Bus Routes */}
        <section aria-label="Top Travelled Bus Routes">
          <h3 className="text-black text-center font-semibold text-xl sm:text-2xl mb-18">
            Top Travelled Bus Routes
          </h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
            {route.map((element, index) => {
              return <HomeCard key={index} title={`From ${element.from} to ${element.to}`} />
            })}
          </div>
        </section>

        {/* Offers Section */}
        <section
          className="bg-gray-200 rounded-xl mx-auto w-full sm:w-11/12 max-w-7xl border border-gray-200 shadow-md p-4 sm:p-8 mt-30"
          aria-label="Bus Ticket Offers and Deals"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl text-center text-gray-800 font-semibold mb-8">
            Bus Ticket Offers and Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {coupon.map((element, index) => {
              return <OfferCard key={index} offer={element.couponCode} text={element.description}/>
            })}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
