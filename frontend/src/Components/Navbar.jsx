import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faBars, faTicket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    return (
        <nav className="flex items-center bg-gray-100 justify-between h-16 px-8 py-4 relative">
            {/*Logo*/}
            <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faBusSimple} style={{ color: '#de1b0d' }} size="xl" />
                <h2 className="text-2xl font-bold" style={{ color: '#de1b0d' }}>bookMyTrip</h2>
            </div>

            {/* Hamburger */}
            <div className="sm:hidden">
                <button onClick={() => setMenu(prev => !prev)}>
                    <FontAwesomeIcon icon={faBars} className="text-[#de1b0d]" size="lg" />
                </button>
            </div>

            {/* Nav Links */}
            <div className={`absolute top-16 left-0 w-full sm:static sm:w-auto sm:flex sm:items-center sm:space-x-8 text-black text-sm ${menu ? 'block' : 'hidden'}`}>
                <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
                    <a href="my-booking" className="hover:text-[#de1b0d] py-2 sm:py-0">My Booking</a>
                    <a href="track-ticket" className="hover:text-[#de1b0d] py-2 sm:py-0">Track Ticket</a>
                    <a href="offers" className="hover:text-[#de1b0d] py-2 sm:py-0">Offers</a>
                    <a href="wallet" className="hover:text-[#de1b0d] py-2 sm:py-0">Wallet</a>
                    <a href="signup" className="hover:text-[#de1b0d] py-2 sm:py-0">Login/Signup</a> 
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
