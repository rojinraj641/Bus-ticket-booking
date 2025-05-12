import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import SortAndFilter from '../Components/SortAndFilter'
import BusInfo from '../Components/BusInfo'

const FilteredResult = () => {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            <Navbar />
            <Header />

            {/* Toggle Button for Sidebar */}
            <div className="lg:hidden flex justify-end px-4 mt-2">
                <button
                    onClick={() => setShowFilter(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                >
                    Filter
                </button>
            </div>

            <section className="flex flex-col lg:flex-row w-full relative overflow-y-auto h-screen">

                {/* Sidebar for large screens */}
                <div className="hidden lg:block">
                    <SortAndFilter />
                </div>

                {/* Sidebar Overlay for small screens */}
                {showFilter && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
                        <div className="bg-white w-64 max-h-screen overflow-y-auto shadow-lg z-50 p-4">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowFilter(false)}
                                    className="text-red-500 font-bold text-lg"
                                >
                                    ✕
                                </button>
                            </div>
                            <SortAndFilter />
                        </div>
                        <div
                            className="flex-grow"
                            onClick={() => setShowFilter(false)}
                        />
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
                    <div className="flex flex-col gap-5">
                        <BusInfo />
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default FilteredResult;
