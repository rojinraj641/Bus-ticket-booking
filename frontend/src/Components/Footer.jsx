import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="bg-sky-800 text-white flex flex-wrap justify-center gap-10 p-3">
                <div className="w-full sm:w-auto text-center sm:text-left">
                    <h3 className="text-sm font-semibold mb-2">About bookMyTrip</h3>
                    <ul className="text-xs space-y-1">
                        <li><a href="#about" className="hover:underline">About Us</a></li>
                        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>

                <div className="w-full sm:w-auto text-center sm:text-left">
                    <h3 className="text-sm font-semibold mb-2">Info</h3>
                    <ul className="text-xs space-y-1">
                        <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#faq" className="hover:underline">FAQ</a></li>
                    </ul>
                </div>

                <div className="w-full sm:w-auto text-center sm:text-left">
                    <h3 className="text-sm font-semibold mb-2">Popular Routes</h3>
                    <ul className="text-xs space-y-1">
                        <li><a href="#route1" className="hover:underline">Kochi - Bangalore</a></li>
                        <li><a href="#route2" className="hover:underline">Trivandrum - Kochi</a></li>
                        <li><a href="#route3" className="hover:underline">Kochi - Coimbatore</a></li>
                    </ul>
                </div>
            </footer>

            <div className="bg-sky-800 text-white text-xs text-center py-3 border-t border-sky-700">
                © 2023 bookMyTrip. All rights reserved
            </div>
        </>
    );
};

export default Footer;
