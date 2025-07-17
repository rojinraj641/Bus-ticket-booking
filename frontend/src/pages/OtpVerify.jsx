import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OtpVerify = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const phone = useSelector((state) => state.user.phone);
    const email = useSelector((state) => state.user.email);
    const name = useSelector((state) => state.user.name);
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ''; // Modern browsers show a generic warning message
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Move to next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleSubmit = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length < 6) {
            toast.error("Please enter all 4 digits of OTP.");
            return;
        }

        try {
            const res = await axios.post('/api/v1/user/verifyOTP', {
                phone,
                otp: fullOtp,
                name,
                email
            });

            if (res.data.success) {
                toast.success("OTP Verified Successfully!");
                localStorage.setItem('token',res.data.token)
                navigate('/')  
            } else {
                toast.error(res.data.message || "Invalid OTP. Please try again.");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong during verification.");
        }
    };

    const handleResend = async () => {
        if (resendDisabled) return;
        setOtp(['', '', '', '', '', ''])
        try {
            await axios.post('/api/v1/user/register', { phone, email, name });
            toast.success("OTP resent successfully");
            setTimer(30);
            setResendDisabled(true);
        } catch (err) {
            toast.error("Failed to resend OTP. Please try again.");
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                if (index > 0) {
                    const updatedOtp = [...otp];
                    updatedOtp[index] = '',
                        setOtp(updatedOtp);
                    document.getElementById(`otp-${index - 1}`).focus();
                }
            }
        }
    }
    return (
        <>
            <Toaster position='top-center' richColors />
            <nav className="flex items-center justify-between h-16 px-6 sm:px-10 py-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBusSimple} style={{ color: '#de1b0d' }} size="xl" />
                    <h2 className="text-2xl font-bold text-[#de1b0d]">bookMyTrip</h2>
                </div>
            </nav>

            <div className="flex justify-center items-center mt-20 px-4 sm:px-6 lg:px-8 py-10">
                <div className="w-full max-w-md bg-white rounded-md border border-gray-300 shadow-md p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Verify OTP</h3>
                    <p className="text-sm font-light mb-2">Enter 6-digit OTP send to {phone}</p>

                    <div className="flex justify-between mt-6 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="text-lg sm:text-xl text-center w-12 sm:w-14 h-12 sm:h-14 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-4 sm:mt-6 h-10 sm:h-12 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 text-sm sm:text-base"
                    >
                        Verify
                    </button>

                    <p className="text-xs sm:text-sm font-light pt-6 text-center">
                        Didn't receive OTP?&nbsp;
                        <button
                            disabled={resendDisabled}
                            onClick={handleResend}
                            className={`text-blue-600 underline ${resendDisabled ? 'text-black opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Resend OTP
                        </button>
                        &nbsp;{resendDisabled && `in ${timer}s`}
                    </p>
                </div>
            </div>
        </>
    );
};

export default OtpVerify;
