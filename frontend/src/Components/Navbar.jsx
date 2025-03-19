import React from 'react';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple} from '@fortawesome/free-solid-svg-icons';

const Navbar = (() => {
    return (
        <header className="header">
            <div className="logo-container">
                <FontAwesomeIcon icon={faBusSimple} style={{ color: "#e01c20", fontSize: "20px" }}/>
                <span className="logo"> bookMyTrip</span>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><a href="#my-booking">My Booking</a></li>
                    <li><a href="#offers">Offers</a></li>
                    <li><a href="#wallet">Wallet</a></li>
                    <li><a href="#login">Login/SignUp</a></li>
                </ul>
            </nav>
        </header>
    )
})

export default Navbar