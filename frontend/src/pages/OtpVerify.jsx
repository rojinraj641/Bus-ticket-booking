import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple } from '@fortawesome/free-solid-svg-icons';

const OtpVerify = () => {
    const [otp, setOtp] = useState(['1', '1', '1', '1']);

    return (
        <>
            <nav className="flex items-center justify-between h-16 px-6 sm:px-10 py-4 shadow-sm">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBusSimple} style={{ color: '#de1b0d' }} size="xl" />
                    <h2 className="text-2xl font-bold text-[#de1b0d]">bookMyTrip</h2>
                </div>
            </nav>

            <div className="flex justify-center items-center mt-20 px-4 sm:px-6 lg:px-8 py-10">
                <div className="w-full max-w-md bg-white rounded-md border border-gray-300 shadow-md p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Verify OTP</h3>
                    <p className="text-sm font-light mb-2">Enter 4-digit OTP</p>

                    <div className="flex justify-between mt-6 mb-6" >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                className="text-lg sm:text-xl text-center w-12 sm:w-14 h-12 sm:h-14 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        ))}
                    </div>

                    <button className="w-full mt-8 sm:mt-10 h-10 sm:h-12 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 text-sm sm:text-base">
                        Verify
                    </button>

                    <p className="flex flex-wrap justify-center text-xs sm:text-sm font-light pt-6 text-center">
                        Didn't receive OTP?&nbsp;
                        <a href="/resend-otp" className="text-blue-600 underline">Resend OTP</a>&nbsp;in 30s
                    </p>
                </div>
            </div>
        </>
    );
};

export default OtpVerify;
