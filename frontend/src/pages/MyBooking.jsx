import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import BookingCard from '../Components/BookingCard';
import Footer from '../Components/Footer';
import { Ticket } from 'lucide-react';

const MyBooking = () => {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const statuses = ['All', 'Confirmed', 'Pending', 'Cancelled'];

    // Placeholder booking data
    const bookings = [
        { id: 1, status: 'completed' },
        { id: 2, status: 'cancelled' },
        { id: 3, status: 'in-progress' },
        { id: 4, status: 'completed' },
        { id: 5, status: 'completed' },
        { id: 6, status: 'cancelled' },
        { id: 7, status: 'in-progress' },
        { id: 8, status: 'completed' },
    ];

    const filteredBookings = selectedStatus === 'All'
        ? bookings
        : bookings.filter((b) => {
            if (selectedStatus === 'Confirmed') return b.status === 'completed';
            if (selectedStatus === 'Pending') return b.status === 'in-progress';
            if (selectedStatus === 'Cancelled') return b.status === 'cancelled';
            return true;
        });

    return (
        <>
            <Navbar />

            <div className="bg-[#F8FAFC] min-h-screen">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                            <Ticket size={22} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-white">My Bookings</h1>
                            <p className="text-sm text-blue-100 mt-0.5">View and manage your bookings here</p>
                        </div>
                    </div>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-start px-4 sm:px-8 py-5">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition
                                ${selectedStatus === status
                                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                                    : 'bg-white text-[#4B5563] border-gray-200 hover:border-[#3B82F6] hover:text-[#2563EB]'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Booking Cards */}
                <div className="flex flex-wrap justify-center gap-6 px-2 sm:px-8 pb-12">
                    {filteredBookings.map((booking) => (
                        <BookingCard key={booking.id} status={booking.status} />
                    ))}
                </div>

                {filteredBookings.length === 0 && (
                    <p className="text-center text-[#4B5563] pb-16">No {selectedStatus.toLowerCase()} bookings found.</p>
                )}
            </div>

            <Footer />
        </>
    );
};

export default MyBooking;