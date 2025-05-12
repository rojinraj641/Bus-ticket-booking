import React from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HomeCard from '../Components/HomeCard';
import OfferCard from '../Components/OfferCard';

const Home = () => {
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
            {[...Array(4)].map((_, index) => (
              <HomeCard key={index} title={`Route ${index + 1}`} />
            ))}
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
            {[...Array(9)].map((_, index) => (
              <OfferCard key={index} offer={`Deal ${index + 1}`} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
