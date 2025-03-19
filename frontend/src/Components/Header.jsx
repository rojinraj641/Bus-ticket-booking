import React, { useState } from 'react';
import '../styles/Home.css';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [boarding, setBoarding] = useState('');
    const [destination, setDestination] = useState('');
    const [dateType, setDateType] = useState('Today');

    return (
        <>
            <Navbar />
            <section className="search-section">
                <div className="search-container">
                    <div className="search-box">
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faBusSimple} style={{ color: "#000000", }} />
                            <input
                                type="text"
                                placeholder="Boarding Point"
                                value={boarding}
                                onChange={(e) => setBoarding(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="search-box">
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#000000", }} />
                            <input
                                type="text"
                                placeholder="Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="search-box">
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#000000", }} />
                            <div className="date-selector">
                                <span>Date of Journey</span>
                                <div className="date-options">
                                    <button
                                        className={dateType === 'Today' ? 'active' : ''}
                                        onClick={() => setDateType('Today')}
                                    >
                                        Today
                                    </button>
                                    <button
                                        className={dateType === 'Tomorrow' ? 'active' : ''}
                                        onClick={() => setDateType('Tomorrow')}
                                    >
                                        Tomorrow
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="search-button">SEARCH BUSES</button>
                </div>
            </section>
        </>
    )
}

export default Header