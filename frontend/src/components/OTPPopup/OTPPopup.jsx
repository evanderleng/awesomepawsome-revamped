import React, { useState, useRef, useContext } from 'react';
import './OTPPopup.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const OTPPopup = ({closePopUp, userEmail}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  // to navigate to the next page (can set set which route to go)
  const navigate = useNavigate();

  // state to see when to display "link has been sent"
  const [linkHasBeenSent, setLinkHasBeenSent] = useState(false)


  // to access stored context across the app
  const {setResetPasswordOTPAuthenticated} = useContext(StoreContext)

  // state for error message
  const [errorMsg, setErrorMsg] = useState("");




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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpSubmit = otp.join('');
    console.log("otp submitted is ", otpSubmit)
    // Implement OTP verification logic here
    try {
        const response = await fetch("/api/email/sendResetPasswordEmail", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            otpToken: otpSubmit,
          }),
        });
  
        // if response ok (email address exist), do the following
        if (response.ok) {
          console.log("OTP Success");
          const result = await response.json();
          console.log("Message:", result.message); // debugging
          setResetPasswordOTPAuthenticated(true); // set this true so that reset password page is now active
          setLinkHasBeenSent(true);
  
        
        } else {
          alert("Wrong OTP");

        }
      } catch (error) {
        // console.error("Error:", error);
        // alert("Error: ", error)

        if (error.response.data.path){ //path exists, let user know which input is incorrect
          alert(error.response.data.path+": "+error.response.data.message);
        } else {
          alert(error.response.data.message);
        }
      }
    };


    return (
        <div className="backdrop">
          <div className="otp-container">
            <button className="close-button" onClick={closePopUp}>✖</button>
    
            {linkHasBeenSent ? (
              <div className="otp-title">
                <h3>Link Sent</h3>
                <p>Check your email for the reset password link.</p>
              </div>
            ) : (
              <>
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
              </>
            )}
    
          </div>
        </div>
      );
    };
    
    export default OTPPopup;