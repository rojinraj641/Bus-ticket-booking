import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
const Signup = () => {
    const [phone, setPhone] = useState('');
    const [referral, setReferral] = useState('');
    const handleClick = async(e)=>{
        e.preventDefault()
        const isValidPhoneNumber = /^[6-9]\d{9}$/.test(phone.trim());
        if(!isValidPhoneNumber){
            toast.error('Enter a valid phone number')
        }
        try{
            const res = await axios.post('api/v1/verifyOTP', {phone});
            console.log(res.data)
        }
        catch(error){
            console.log(error.message);
        }
    }
    return (
        <>
            <nav className="flex items-center justify-between h-16 px-6 sm:px-10 py-4 shadow-sm">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBusSimple} style={{ color: '#de1b0d' }} size="xl" />
                    <h2 className="text-2xl font-bold text-[#de1b0d]">bookMyTrip</h2>
                </div>
            </nav>
            <Toaster richColors/>
            <div className="flex justify-center items-center mt-24 px-4 py-5">
                <div className="w-full max-w-md bg-white rounded-md border border-gray-300 shadow-md p-6">
                    <h3 className="text-xl font-bold mb-6">Signup</h3>
                    <form onSubmit={handleClick}>
                    <input
                        type="tel"
                        value={phone}
                        placeholder="Enter Phone Number"
                        className="w-full h-10 mt-5 p-3 mb-4 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        value={referral}
                        placeholder="Enter Referral Code"
                        className="w-full h-10 mt-5 p-3 mb-4 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e)=>setReferral(e.target.value)}
                    />

                    <button 
                    className="w-full mt-5 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Continue
                    </button>
                    </form>
                    <div className="flex items-start space-x-2 mt-4">
                        <input type="checkbox" id="terms" className="mt-1" />
                        <label htmlFor="terms" className="text-xs font-thin">
                            By proceeding, you agree to bookMyTrip’s{" "}
                            <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a href="/terms-and-conditions" className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                Terms & Conditions
                            </a>.
                        </label>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Signup;
