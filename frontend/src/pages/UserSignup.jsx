import React, { useEffect, useRef, useState } from 'react';
import '../styles/UserSignup.css';
import '../styles/OtpVerification.css';
import axios from 'axios';


const UserSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [step, setStep] = useState(true);

  // Sending data to backend for authentication
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('api/signup',{
        phoneNumber,
        referralCode,
      });
    }
    catch(error){
      console.log(error);
    }
  };

  // Handle form submission for otp verification
  const handleRenderOtp = (e)=>{
    e.preventDefault();
    if(step===true){
      setStep(false);
      console.log(step);
    }
  }
  // OTP verification
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Otp timer
  const [timeleft, setTimeleft] = useState(30);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (timeleft > 0) {
      const timer = setInterval(() => {
        setTimeleft(timeleft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    else {
      setIsActive(false);
    }
  }, [timeleft]);

  // Format time to mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };



  //Handle resend OTP
  const handleResend = () => {
    if (isActive) {
      setTimeleft(30);
      setIsActive(true);
    }
  };

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow one digit
    if (value.length > 1) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input field if current one is filled
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs[3].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('Submitted OTP:', otpValue);
    // Add your OTP verification logic here
  };

  // Request OTP again
  const requestOTP = () => {
    console.log('Requesting new OTP');
    // Add your logic to request a new OTP
  };

  return (
    <div class='app-container'>
      {step === true ? (
        <div className='signup-body'>
          <div className="logo-container-signup">
            <i className="fa-solid fa-bus-simple" style={{ color: "#e01c20", fontSize: "20px" }}></i>
            <h1 className="site-name">bookMyTrip</h1>
          </div>
          <div className="signup-container">
            <div className="signup-wrapper">
              {/* Main form container */}
              <div className="form-container">
                <div className="signup-box">
                  <h2 className="signup-title">SignUp</h2>

                  <form onSubmit={handleSignupSubmit} class=''>
                    <div className="input-group">
                      <div className="phone-input">
                        <span className="country-code">+91</span>
                        <input
                          type="tel"
                          placeholder="Enter Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Enter referral code"
                        className="referral-input"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="continue-button"
                      onClick={handleRenderOtp}
                    >
                      Continue
                    </button>
                  </form>

                  <p className="terms-text">
                    By proceeding, you agree to bookMyTrip's <a href="#" className="link">Privacy Policy</a> and <a href="#" className="link">Terms & Conditions</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="otp-body">
          <div className="otp-logo-container">
            <i className="fa-solid fa-bus-simple" style={{ color: "#e01c20", fontSize: "20px" }}></i>
            <h1 className="site-name">bookMyTrip</h1>
          </div>
          <div className="otp-container">
            <div className="otp-wrapper">

              {/* OTP verification form */}
              <div className="form-container">
                <div className="otp-box">
                  <h2 className="otp-title">Verify OTP</h2>
                  <p className="otp-instruction">Enter 4 digit OTP sent to </p>

                  <form onSubmit={handleSubmit}>
                    <div className="otp-input-group">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength="1"
                          className="otp-input"
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onPaste={index === 0 ? handlePaste : null}
                          ref={inputRefs[index]}
                        />
                      ))}
                    </div>

                    <button type="submit" className="verify-button">
                      Verify
                    </button>
                  </form>

                  <p className="resend-text">
                    Didn't get OTP? <button className="resend-button" onClick={handleResend}>Request OTP</button> in <span className="timer">{formatTime(timeleft)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSignup;
