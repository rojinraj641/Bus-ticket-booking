import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Wallet = () => {
    return (
        <>
            <Navbar />
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">My Wallet</h1>
                </div>

                {/* Wallet Balance Card */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
                    <div className="mb-6">
                        <p className="text-lg sm:text-xl font-medium">Available Balance</p>
                        <p className="text-3xl sm:text-4xl font-extrabold mt-2">$10.00</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="w-full sm:w-auto bg-white text-blue-800 font-semibold px-6 py-2 rounded-lg hover:bg-blue-100 transition">
                            + Add Money
                        </button>
                        <button className="w-full sm:w-auto border border-white text-white font-semibold px-6 py-2 rounded-lg hover:bg-white hover:text-blue-800 transition">
                            Transaction History
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Wallet;
