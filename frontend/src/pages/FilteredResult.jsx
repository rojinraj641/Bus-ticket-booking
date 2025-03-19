import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../styles/Filtered.css';

const FilteredResult = () => {
  const [currentPage, setCurrentPage] = useState('searchResults');
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch buses from MongoDB database
  useEffect(() => {
    // This would be replaced with your actual API call to MongoDB
    const fetchBuses = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API endpoint
        // const response = await fetch('/api/buses');
        // const data = await response.json();
        // setBuses(data);

        // Remove this once you integrate with your MongoDB
        console.log('You would fetch bus data from MongoDB here');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching buses:', error);
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    setCurrentPage('seatSelection');
  };

  const handleBackToSearch = () => {
    setCurrentPage('searchResults');
    setSelectedBus(null);
  };

  const [departureTime, setDepartureTime] = useState({
    beforeSixAm: false,
    sixAmToTwelvePm: false,
    twelvePmToSixPm: false,
    afterSixPm: false
  });

  const [busType, setBusType] = useState({
    seater: false,
    sleeper: false,
    ac: false,
    nonAc: false
  });

  const [arrivalTime, setArrivalTime] = useState({
    beforeSixAm: false,
    sixAmToTwelvePm: false,
    twelvePmToSixPm: false,
    afterSixPm: false
  });

  const [amenities, setAmenities] = useState({
    waterBottle: false,
    blankets: false,
    chargingPoint: false,
    bedsheet: false
  });

  const handleDepartureTimeChange = (key) => {
    setDepartureTime({ ...departureTime, [key]: !departureTime[key] });
  };

  const handleBusTypeChange = (key) => {
    setBusType({ ...busType, [key]: !busType[key] });
  };

  const handleArrivalTimeChange = (key) => {
    setArrivalTime({ ...arrivalTime, [key]: !arrivalTime[key] });
  };

  const handleAmenitiesChange = (key) => {
    setAmenities({ ...amenities, [key]: !amenities[key] });
  };

  // Search Results Page
  const SearchResultsPage = () => (
    <>
      <Header />
      <div className="page-container">
        <div className="content-container">

          <div className="filters-container">
            <h2 className="filters-title">FILTERS</h2>

            <div className="filter-section">
              <h3 className="section-title">DEPARTURE TIME</h3>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="dep-before-6am"
                    className="checkbox-input"
                    checked={departureTime.beforeSixAm}
                    onChange={() => handleDepartureTimeChange('beforeSixAm')}
                  />
                  <label htmlFor="dep-before-6am">Before 6 am</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="dep-6am-12pm"
                    className="checkbox-input"
                    checked={departureTime.sixAmToTwelvePm}
                    onChange={() => handleDepartureTimeChange('sixAmToTwelvePm')}
                  />
                  <label htmlFor="dep-6am-12pm">6 am to 12 pm</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="dep-12pm-6pm"
                    className="checkbox-input"
                    checked={departureTime.twelvePmToSixPm}
                    onChange={() => handleDepartureTimeChange('twelvePmToSixPm')}
                  />
                  <label htmlFor="dep-12pm-6pm">12 pm to 6 pm</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="dep-after-6pm"
                    className="checkbox-input"
                    checked={departureTime.afterSixPm}
                    onChange={() => handleDepartureTimeChange('afterSixPm')}
                  />
                  <label htmlFor="dep-after-6pm">After 6 pm</label>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="section-title">BUS TYPE</h3>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="seater"
                    className="checkbox-input"
                    checked={busType.seater}
                    onChange={() => handleBusTypeChange('seater')}
                  />
                  <label htmlFor="seater">Seater</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="sleeper"
                    className="checkbox-input"
                    checked={busType.sleeper}
                    onChange={() => handleBusTypeChange('sleeper')}
                  />
                  <label htmlFor="sleeper">Sleeper</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="ac"
                    className="checkbox-input"
                    checked={busType.ac}
                    onChange={() => handleBusTypeChange('ac')}
                  />
                  <label htmlFor="ac">AC</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="non-ac"
                    className="checkbox-input"
                    checked={busType.nonAc}
                    onChange={() => handleBusTypeChange('nonAc')}
                  />
                  <label htmlFor="non-ac">Non AC</label>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="section-title">ARRIVAL TIME</h3>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="arr-before-6am"
                    className="checkbox-input"
                    checked={arrivalTime.beforeSixAm}
                    onChange={() => handleArrivalTimeChange('beforeSixAm')}
                  />
                  <label htmlFor="arr-before-6am">Before 6 am</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="arr-6am-12pm"
                    className="checkbox-input"
                    checked={arrivalTime.sixAmToTwelvePm}
                    onChange={() => handleArrivalTimeChange('sixAmToTwelvePm')}
                  />
                  <label htmlFor="arr-6am-12pm">6 am to 12 pm</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="arr-12pm-6pm"
                    className="checkbox-input"
                    checked={arrivalTime.twelvePmToSixPm}
                    onChange={() => handleArrivalTimeChange('twelvePmToSixPm')}
                  />
                  <label htmlFor="arr-12pm-6pm">12 pm to 6 pm</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="arr-after-6pm"
                    className="checkbox-input"
                    checked={arrivalTime.afterSixPm}
                    onChange={() => handleArrivalTimeChange('afterSixPm')}
                  />
                  <label htmlFor="arr-after-6pm">After 6 pm</label>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="section-title">AMENITIES</h3>
              <div className="amenities-group">
                <button
                  className={`amenity-button ${amenities.waterBottle ? 'active' : ''}`}
                  onClick={() => handleAmenitiesChange('waterBottle')}
                >
                  Water bottle
                </button>
                <button
                  className={`amenity-button ${amenities.blankets ? 'active' : ''}`}
                  onClick={() => handleAmenitiesChange('blankets')}
                >
                  Blankets
                </button>
                <button
                  className={`amenity-button ${amenities.chargingPoint ? 'active' : ''}`}
                  onClick={() => handleAmenitiesChange('chargingPoint')}
                >
                  Charging Point
                </button>
                <button
                  className={`amenity-button ${amenities.bedsheet ? 'active' : ''}`}
                  onClick={() => handleAmenitiesChange('bedsheet')}
                >
                  Bedsheet
                </button>
              </div>
            </div>
          </div>
          <div className="main-content">
            <div className="table-header">
              <div className="header-sort">SORT BY</div>
              <div className="header-departure">Departure</div>
              <div className="header-duration">Duration</div>
              <div className="header-arrival">Arrival</div>
              <div className="header-rating">Rating</div>
              <div className="header-fare">Fare</div>
              <div className="header-availability">Seat Availability</div>
            </div>
            <div className="bus-list">
              {loading ? (
                <div className="loading-message">Loading buses...</div>
              ) : buses.length === 0 ? (
                <div className="no-buses-message">No buses available for this route.</div>
              ) : (
                buses.map(bus => (
                  <div key={bus._id} className="bus-item">
                    <div className="bus-details-row">
                      <div className="bus-operator">
                        <h3 className="operator-name">{bus.operator}</h3>
                        <p className="operator-code">{bus.operatorCode}</p>
                      </div>

                      <div className="bus-departure">
                        <p className="departure-time">{bus.departure}</p>
                        <p className="drop-location">{bus.dropLocations}</p>
                      </div>

                      <div className="bus-duration">
                        <p>{bus.duration}</p>
                      </div>

                      <div className="bus-arrival">
                        <p className="arrival-time">{bus.arrival}</p>
                        <p className="arrival-date">{bus.date}</p>
                      </div>

                      <div className="bus-rating">
                        <span className="rating-badge">{bus.rating}</span>
                      </div>

                      <div className="bus-fare">
                        <p className="fare-amount">{bus.fare}</p>
                        {bus.offerAvailable && <p className="offer-text">10% OFF Offer</p>}
                      </div>

                      <div className="bus-action">
                        <button
                          onClick={() => handleSelectBus(bus)}
                          className="select-seat-btn"
                        >
                          Select Seat
                        </button>
                        <p className="seats-left">{bus.seats}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );

  // Seat Selection Page
  const SeatSelectionPage = () => {
    if (!selectedBus) return null;

    return (
      <>
        <Header />
        <div className="page-container">
          <div className="content-container">

            <div className="main-content">
              <div className="table-header">
                <div className="header-filters">FILTERS</div>
                <div className="header-sort">SORT BY</div>
                <div className="header-departure">Departure</div>
                <div className="header-duration">Duration</div>
                <div className="header-arrival">Arrival</div>
                <div className="header-rating">Rating</div>
                <div className="header-fare">Fare</div>
                <div className="header-availability">Seat Availability</div>
              </div>

              <div className="selected-bus-details">
                <div className="bus-details-row">
                  <div className="bus-operator">
                    <h3 className="operator-name">{selectedBus.operator}</h3>
                    <p className="operator-code">{selectedBus.operatorCode}</p>
                  </div>

                  <div className="bus-departure">
                    <p className="departure-time">{selectedBus.departure}</p>
                    <p className="drop-location">{selectedBus.dropLocations}</p>
                  </div>

                  <div className="bus-duration">
                    <p>{selectedBus.duration}</p>
                  </div>

                  <div className="bus-arrival">
                    <p className="arrival-time">{selectedBus.arrival}</p>
                    <p className="arrival-date">{selectedBus.date}</p>
                  </div>

                  <div className="bus-rating">
                    <span className="rating-badge">{selectedBus.rating}</span>
                  </div>

                  <div className="bus-fare">
                    <p className="fare-amount">{selectedBus.fare}</p>
                  </div>

                  <div className="bus-action">
                    <button
                      onClick={handleBackToSearch}
                      className="hide-seat-btn"
                    >
                      Hide Seat
                    </button>
                  </div>
                </div>
              </div>

              <div className="seat-layout-container">
                <div className="lower-deck">
                  <h3 className="deck-title">Lower Deck</h3>
                  <div className="seat-grid">
                    <div className="seat available"></div>
                    <div className="seat available"></div>
                    <div className="seat-spacer"></div>
                    <div className="seat booked"></div>
                    <div className="seat-empty"></div>

                    <div className="seat available"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-spacer"></div>
                    <div className="seat-empty"></div>
                    <div className="seat selected"></div>

                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-spacer"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>
                  </div>
                </div>

                <div className="upper-deck">
                  <h3 className="deck-title">Upper Deck</h3>
                  <div className="seat-grid">
                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-spacer"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>

                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-spacer"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>

                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-spacer"></div>
                    <div className="seat-empty"></div>
                    <div className="seat-empty"></div>
                  </div>
                </div>
              </div>

              <div className="seat-legend">
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span className="legend-text">Available</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color booked"></div>
                  <span className="legend-text">Booked</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color selected"></div>
                  <span className="legend-text">Selected</span>
                </div>
              </div>

              <div className="booking-details-container">
                <div className="booking-form">
                  <div className="form-group">
                    <label className="form-label">Boarding Point:</label>
                    <select className="form-select">
                      <option>Select boarding point</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dropping Point:</label>
                    <select className="form-select">
                      <option>Select dropping point</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Seat No:</label>
                    <div className="form-display">L4</div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Fare Details:</label>
                    <div className="form-display">₹790</div>
                  </div>

                  <button className="payment-btn">Proceed to Payment</button>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </>
    );
  };


  return (
    <div className="app">
      {currentPage === 'searchResults' && <SearchResultsPage />}
      {currentPage === 'seatSelection' && <SeatSelectionPage />}
    </div>
  );
};

export default FilteredResult;