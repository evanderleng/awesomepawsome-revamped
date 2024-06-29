import React, { useState, useRef } from 'react';
import './OTPPopup.css';

const OTPPopup = ({closePopUp}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move focus to next input
      if (index < 5 && element.value !== '') {
        inputRefs.current[index + 1].focus();
      }
    } else if (element.value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Submitted: ${otp.join('')}`);
    // Implement OTP verification logic here
    

  };

  return (
    <div className="backdrop">
      <div className="otp-container">
      <button className="close-button" onClick={closePopUp}>✖</button>
        <div className="otp-title">
          <h3>Enter OTP</h3>
          <p>Please enter the 6-digit code sent to your email</p>
        </div>
        <form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-input-container">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyUp={(e) => e.key === 'Backspace' && handleBackspace(e.target, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OTPPopup;
