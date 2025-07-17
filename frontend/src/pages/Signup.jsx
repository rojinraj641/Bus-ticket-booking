import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { setUserDetails } from '../Features/User/userSlice.js';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        const isValidPhone = /^[6-9]\d{9}$/.test(phone.trim());
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

        if (!isValidPhone) {
            toast.error('Enter a valid phone number');
            return;
        }

        if (!isValidEmail) {
            toast.error('Enter a valid email address');
            return;
        }

        if (!name || name.trim().length < 3) {
            toast.error('Enter a valid name');
            return;
        }

        if (!checkbox) {
            toast.error('Please agree to the privacy policy and terms and conditions');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post('/api/v1/user/register', {
                phone,
                name,
                email
            });

            toast.success(res.data.message || 'OTP sent successfully');
            console.log(res.data);

            // Store user temporarily or navigate to OTP screen
            dispatch(setUserDetails({phone, email, name}))
            navigate('/verifyOTP');
        } catch (error) {
            toast.error('Something went wrong during registration');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="flex items-center justify-between h-16 px-6 sm:px-10 py-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBusSimple} style={{ color: '#de1b0d' }} size="xl" />
                    <h2 className="text-2xl font-bold text-[#de1b0d]">bookMyTrip</h2>
                </div>
            </nav>

            <Toaster richColors />

            <div className="flex justify-center items-center mt-24 px-4 py-5">
                <div className="w-full max-w-md bg-white rounded-md border border-gray-300 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-6">Signup</h3>
                    <form onSubmit={handleClick}>
                        <input
                            type="tel"
                            value={phone}
                            placeholder="Enter phone number"
                            className="w-full h-10 mt-2 p-3 mb-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            type="text"
                            value={name}
                            placeholder="Enter username"
                            className="w-full h-10 mt-2 p-3 mb-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            value={email}
                            placeholder="Enter email ID"
                            className="w-full h-10 mt-2 p-3 mb-4 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={!checkbox || loading}
                            className={`w-full mt-5 h-10 rounded-md text-white transition ${
                                !checkbox || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                            }`}
                        >
                            {loading ? 'Please wait...' : 'Continue'}
                        </button>
                    </form>

                    <div className="flex items-start space-x-2 mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={checkbox}
                            onChange={() => setCheckbox((prev) => !prev)}
                            className="mt-1"
                        />
                        <label htmlFor="terms" className="text-xs font-thin">
                            By proceeding, you agree to bookMyTrip’s{' '}
                            <a
                                href="/privacy-policy"
                                className="underline text-blue-600 hover:text-blue-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </a>{' '}
                            and{' '}
                            <a
                                href="/terms-and-conditions"
                                className="underline text-blue-600 hover:text-blue-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms & Conditions
                            </a>.
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
