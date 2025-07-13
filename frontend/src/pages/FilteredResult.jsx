import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import SortAndFilter from '../Components/SortAndFilter'
import BusInfo from '../Components/BusInfo'
import { useEffect } from 'react'

const FilteredResult = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            {/* Fixed Navbar + Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
                <Header />
            </div>

            {/* Spacer for fixed Navbar + Header */}
            <div className="h-[165px]" />

            {/* Main Content Area */}
            <div className="flex flex-row w-full">
                {/* Sticky Filter Panel */}
                <div className="sticky top-[165px] border-r border-gray-200 p-8 overflow-hidden">
                    <SortAndFilter />
                </div>

                {/* Scrollable Main Content */}
                <main className="flex-grow h-180 overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Search Results</h2>
                        <p className="text-gray-600 text-sm">Find the best bus options for your journey</p>
                    </div>
                    <BusInfo/>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default FilteredResult;
