import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import OfferCard from '../Components/OfferCard';

const Offers = () => {
    return (
        <>
            <Navbar />

            {/* Main Section */}
            <main className="bg-white min-h-screen">
                {/* Top Banner */}
                <section className="w-full bg-sky-800 px-4 sm:px-8 py-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center sm:text-left">
                        My Offers
                    </h1>
                </section>

                {/* Offers Section */}
                <section className="bg-gray-100 rounded-xl mx-auto mb-12 mt-6 w-11/12 max-w-7xl border border-gray-200 shadow-md p-4 sm:p-8">
                    {/* Title */}
                    <h2 className="text-lg sm:text-xl md:text-2xl text-center text-gray-800 font-semibold mb-8">
                        Bus Ticket Offers and Deals
                    </h2>

                    {/* Responsive Offer Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
                        {[...Array(9)].map((_, index) => (
                            <OfferCard key={index} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Offers;
