import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import BookingCard from '../Components/BookingCard';
import Footer from '../Components/Footer';

const MyBooking = () => {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const statuses = ['All', 'Confirmed', 'Pending', 'Cancelled'];

    // Placeholder booking data
    const bookings = [
        { id: 1, status: 'completed' },
        { id: 2, status: 'cancelled' },
        { id: 3, status: 'in-progress' },
        { id:4, status: 'completed'},
        { id: 5, status: 'completed' },
        { id: 6, status: 'cancelled' },
        { id: 7, status: 'in-progress' },
        { id:8, status: 'completed'}
    ];

    const filteredBookings = selectedStatus === 'All'
        ? bookings
        : bookings.filter(b => {
            if (selectedStatus === 'Confirmed') return b.status === 'completed';
            if (selectedStatus === 'Pending') return b.status === 'in-progress';
            if (selectedStatus === 'Cancelled') return b.status === 'cancelled';
            return true;
        });

    return (
        <>
            <Navbar />

            <div className="bg-sky-900 p-6 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-bold text-white">My Bookings</h1>
                <p className="text-sm text-white mt-1">View and manage your bookings here</p>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-start px-4 py-5">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`rounded-3xl px-4 py-1 text-sm font-medium shadow-md border transition 
                            ${selectedStatus === status
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white text-black border-gray-400'
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

            <Footer />
        </>
    );
};

export default MyBooking;
