import React, { useState } from "react";
import "./VerifyEmailPage.css";
import OTPPopup from "../../components/OTPPopup/OTPPopup";

const VerifyEmailPage = () => {
  // state to check if email is verified or not, use to display pop up for OTP
  const [emailIsVerified, setEmailIsVerified] = useState(true);

  const handleOTPClose = () => {
    setEmailIsVerified(false);
  }

  return (
    <>
      <div className="verify-email-container">
        <div className="check-email-title">
          <h3>Verify Email</h3>
          <p>Please enter your email address</p>
        </div>
        <form action="" className="check-email-form">
          <input type="email" name="email" placeholder="email" required />
          <button type="submit" className="submit-button">
            Verify Email
          </button>
        </form>
      </div>
      {/* if emailIsVerified is true, display the OTP Popup */}
      <div>{emailIsVerified ? <OTPPopup closePopUp={handleOTPClose}/> : null}</div>
    </>
  );
};

export default VerifyEmailPage;
