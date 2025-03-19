import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-section">
                    <h3>About bookMyTrip</h3>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Info</h3>
                    <ul>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Popular Routes</h3>
                    <ul>
                        <li><a href="#route1">Kochi - Bangalore</a></li>
                        <li><a href="#route2">Trivandrum - Kochi</a></li>
                        <li><a href="#route3">Kochi - Coimbatore</a></li>
                    </ul>
                </div>
            </footer>
            <div className="copyright">
                © 2023 bookMyTrip. All rights reserved
            </div>    
        </>
    )
}

export default Footer