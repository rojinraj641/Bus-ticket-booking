import Navbar from "../Components/Navbar";
import PassengerInfo from "../Components/PassengerInfo";
import Footer from "../Components/Footer";
import { useState } from "react";

const PassengerDetails = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cancellation, setCancellation] = useState("");

    return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 py-6 md:py-10">
                <h1 className="text-xl font-bold mb-4">Passenger Information</h1>
                <PassengerInfo />
            </div>

            {/* Contact Details */}
            <div className="px-4 md:px-8 py-6">
                <h1 className="text-xl font-bold mb-4">Contact Details</h1>
                <div className="border w-full rounded-md p-5">
                    <h3 className="font-semibold">Ticket will be sent to these details</h3>
                    <div className="flex flex-col md:flex-row flex-wrap gap-6 pt-4">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label htmlFor="email" className="mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                            <label htmlFor="phone" className="mb-1">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancellation */}
            <div className="px-4 md:px-8 pt-6 pb-20">
                <h1 className="text-xl font-bold mb-4">Cancellation</h1>
                <div className="border rounded-md w-full p-5 flex flex-col gap-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="cancellation"
                            value="yes"
                            checked={cancellation === "yes"}
                            onChange={() => setCancellation("yes")}
                        />
                        Yes, I would like to add Rs.100 for free cancellation
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="cancellation"
                            value="no"
                            checked={cancellation === "no"}
                            onChange={() => setCancellation("no")}
                        />
                        No, I will pay cancellation charges
                    </label>
                </div>
            </div>
            <hr/>

            {/* Total + Button */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-6 gap-4">
                <h1 className="text-xl font-semibold">Total Amount: ₹1100</h1>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition"
                >
                    Proceed to Payment
                </button>
            </div>

            <Footer />
        </>
    );
};

export default PassengerDetails;
