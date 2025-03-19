import React, { useState, useEffect } from 'react';
import '../styles/Booking.css';
import Header from '../Components/Header';
import axios from 'axios';

const Booking = () => {
  // Application state
  const [currentPage, setCurrentPage] = useState('form'); // 'form' or 'payment'
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    state: '',
    email: '',
    phoneNumber: '',
    freeCancellation: true
  });
  
  // Data from database
  const [statesList, setStatesList] = useState([]);
  const [journeyDetails, setJourneyDetails] = useState(null);
  const [fareDetails, setFareDetails] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [bookingId, setBookingId] = useState('');
  
  // Payment page state
  const [couponCode, setCouponCode] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial data from MongoDB
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch states for dropdown
        const statesResponse = await axios.get('/api/states');
        setStatesList(statesResponse.data);
        
        // Fetch journey details (in real app, this would happen after user selects a route)
        const journeyResponse = await axios.get('/api/journey/ERN-BLR-20250321');
        setJourneyDetails(journeyResponse.data);
        
        // Fetch fare details
        const fareResponse = await axios.get('/api/fares/ERN-BLR-20250321');
        setFareDetails(fareResponse.data);
        
        // Generate booking ID
        const bookingResponse = await axios.get('/api/generate-booking-id');
        setBookingId(bookingResponse.data.bookingId);
        
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load application data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Fetch available coupons when switching to payment page
  useEffect(() => {
    if (currentPage === 'payment') {
      const fetchCoupons = async () => {
        setLoading(true);
        try {
          const response = await axios.get('/api/coupons/available');
          setAvailableCoupons(response.data);
        } catch (err) {
          console.error('Error fetching coupons:', err);
          setError('Failed to load available coupons.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchCoupons();
    }
  }, [currentPage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Save the passenger information to MongoDB
      const response = await axios.post('/api/bookings', {
        bookingId,
        passengerDetails: formData,
        journeyId: journeyDetails.journeyId,
        fareId: fareDetails.fareId,
        status: 'PAYMENT_PENDING'
      });
      
      console.log('Booking created:', response.data);
      setCurrentPage('payment');
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to save booking information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async (couponId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Verify and apply coupon in MongoDB
      const response = await axios.post('/api/apply-coupon', {
        couponId,
        bookingId
      });
      
      if (response.data.applied) {
        const coupon = availableCoupons.find(c => c._id === couponId);
        setSelectedCoupon(coupon);
        
        // Update fare details with new data from server
        setFareDetails(response.data.updatedFare);
      } else {
        setError(response.data.message || 'Failed to apply coupon');
      }
    } catch (err) {
      console.error('Error applying coupon:', err);
      setError('Failed to apply coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPay = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Process payment through MongoDB
      const response = await axios.post('/api/process-payment', {
        bookingId,
        paymentMethod,
        amount: fareDetails?.totalAmount || 0
      });
      
      if (response.data.success) {
        alert('Payment successful! Your booking is confirmed.');
        
        // Reset form and navigate back to form
        setFormData({
          name: '',
          age: '',
          gender: 'male',
          state: '',
          email: '',
          phoneNumber: '',
          freeCancellation: true
        });
        setCurrentPage('form');
      } else {
        setError(response.data.message || 'Payment failed');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && !journeyDetails && !fareDetails) {
    return (
      <div className="loading-container">
        <p>Loading application data...</p>
      </div>
    );
  }

  // Render error state
  if (error && !journeyDetails && !fareDetails) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>
    );
  }

  return (
    <div className="bookmytrip-container">
      <Header />
      {currentPage === 'form' ? (
        <main className="main-content">
          {journeyDetails && (
            <div className="journey-summary">
              <h2>{journeyDetails.from} → {journeyDetails.to}</h2>
              <p>{new Date(journeyDetails.departureDate).toLocaleDateString()} | {journeyDetails.busName} | {journeyDetails.busType}</p>
            </div>
          )}
          
          <form onSubmit={handleFormSubmit}>
            <section className="form-section passenger-info">
              <h2>Passenger Information</h2>
              <div className="passenger-header">
                <span>Passenger 1 | Seat {journeyDetails?.seatNumber || 'L4'}</span>
                <button type="button" className="change-btn">Change Seats</button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {statesList.map(state => (
                      <option key={state._id} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="form-section contact-details">
              <h2>Contact Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <p className="info-text">Ticket will be sent to these details</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="form-section cancellation">
              <h2>Cancellation</h2>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="freeCancellation"
                    checked={formData.freeCancellation}
                    onChange={() => setFormData({...formData, freeCancellation: true})}
                  />
                  Yes, I would like to add Rs100 for free cancellation. I read the 
                  <a href="#terms" className="terms-link"> terms and conditions</a>
                </label>
                <label>
                  <input
                    type="radio"
                    name="freeCancellation"
                    checked={!formData.freeCancellation}
                    onChange={() => setFormData({...formData, freeCancellation: false})}
                  />
                  No, I will pay cancellation charges
                </label>
              </div>
            </section>

            {fareDetails && (
              <div className="payment-section">
                <div className="total-amount">
                  <h3>Total Amount: Rs {fareDetails.totalAmount}</h3>
                </div>
                <button type="submit" className="proceed-btn" disabled={loading}>
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
          </form>
        </main>
      ) : (
        <div className="payment-page">
          <div className="journey-bar">
            <div className="journey-details">
              <span>{journeyDetails?.from} → {journeyDetails?.to}</span>
            </div>
            <div className="payment-timer">
              <span>Pay within 10:00min</span>
            </div>
          </div>

          <div className="payment-content">
            <div className="payment-left-section">
              <div className="coupon-section">
                <div className="coupon-input">
                  <label>Have a coupon code?</label>
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <h3>Apply Coupons</h3>
                <div className="coupon-list">
                  {availableCoupons.map((coupon) => (
                    <div key={coupon._id} className="coupon-item">
                      <div className="coupon-details">
                        <p className="coupon-discount">{coupon.description}</p>
                        <p className="coupon-code">{coupon.code}</p>
                      </div>
                      <button 
                        className="apply-btn" 
                        onClick={() => handleApplyCoupon(coupon._id)}
                        disabled={loading}
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="payment-methods">
                <h3>Payment Methods</h3>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={paymentMethod === 'creditCard'}
                      onChange={() => setPaymentMethod('creditCard')}
                    />
                    Credit Card
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debitCard"
                      checked={paymentMethod === 'debitCard'}
                      onChange={() => setPaymentMethod('debitCard')}
                    />
                    Debit Card
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    UPI
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                    />
                    Wallet
                  </label>
                </div>
              </div>

              <button 
                className="proceed-pay-btn" 
                onClick={handleProceedToPay}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Pay'}
              </button>
              
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="payment-right-section">
              <div className="booking-details">
                <div className="bus-info">
                  <h3>{journeyDetails?.busName || 'JSR Roadways'} <span className="bus-type">{journeyDetails?.busType || 'AC Sleeper'}</span></h3>
                  
                  <div className="journey-time">
                    <div className="departure">
                      <h4>Departure</h4>
                      <p className="time">{journeyDetails?.departureTime || '22:30'}</p>
                      <p className="date">{journeyDetails?.departureDate ? new Date(journeyDetails.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'March 21'}</p>
                    </div>
                    <div className="arrival">
                      <h4>Arrival</h4>
                      <p className="time">{journeyDetails?.arrivalTime || '07:30'}</p>
                      <p className="date">{journeyDetails?.arrivalDate ? new Date(journeyDetails.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'March 22'}</p>
                    </div>
                  </div>

                  <div className="boarding-info">
                    <div className="boarding-point">
                      <h4>Boarding Point</h4>
                      <p>{journeyDetails?.boardingPoint || 'Kalmaserry'}</p>
                    </div>
                    <div className="dropping-point">
                      <h4>Dropping Point</h4>
                      <p>{journeyDetails?.droppingPoint || 'Madiwala'}</p>
                    </div>
                  </div>

                  <div className="passenger-info">
                    <h4>Passenger</h4>
                    <p>{formData.name} ({formData.age}, {formData.gender === 'male' ? 'M' : 'F'})</p>
                  </div>
                </div>

                <div className="fare-details">
                  <h3>Fare Details</h3>
                  <div className="fare-item">
                    <span>Base Fare</span>
                    <span>{fareDetails?.baseFare || 1100}</span>
                  </div>
                  {formData.freeCancellation && (
                    <div className="fare-item">
                      <span>Cancellation Fee</span>
                      <span>{fareDetails?.cancellationFee || 100}</span>
                    </div>
                  )}
                  {selectedCoupon && (
                    <div className="fare-item coupon-applied">
                      <span>Coupon Applied</span>
                      <span>-{selectedCoupon.discount || 200}</span>
                    </div>
                  )}
                  <div className="fare-item total">
                    <span>Total</span>
                    <span>{fareDetails?.totalAmount || 1000}</span>
                  </div>
                  
                  {selectedCoupon && (
                    <div className="discount-message">
                      <p>You have saved Rs {selectedCoupon.discount || 200} on this booking</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-column">
          <h4>About bookMyTrip</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Info</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Popular Routes</h4>
          <ul>
            <li><a href="#route1">Kochi - Bangalore</a></li>
            <li><a href="#route2">Hyderabad - Kochi</a></li>
            <li><a href="#route3">Mumbai - Pune</a></li>
          </ul>
        </div>
        <div className="copyright">
          <p>© 2023 bookMyTrip. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Booking;