import React, { useState } from "react";
import "./VerifyEmailPage.css";
import OTPPopup from "../../components/OTPPopup/OTPPopup";
import axios from "axios";

const VerifyEmailPage = () => {
  // state to check if email is verified or not, use to display pop up for OTP
  const [emailIsVerified, setEmailIsVerified] = useState(false);

  // state for error message
  const [errorMsg, setErrorMsg] = useState("");

  // state for passing email over to OTPPopup.jsx
  const [userEmail, setUserEmail] = useState("");

  const handleOTPClose = () => {
    setEmailIsVerified(false);
  }

  const handleEmailExistCheck = async (e) => {
    e.preventDefault();

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

    // name = "email"
    const email = formData.get("email");
    setUserEmail(email);
    console.log("userEmail is  ", userEmail)

    try {
        const response = await fetch("http://127.0.0.1:4000/api/email/send2faEmail_ResetPassword", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });
  
        // if response ok (email address exist), do the following
        if (response.ok) {
          console.log("Email Exists, sending OTP");
          const result = await response.json();
          console.log("Message:", result.message); // debugging
          setEmailIsVerified(true);
        //   setUserEmail(email);
  
        
        } else {
          const errorData = await response.json();
          console.log("Error:", errorData.message);
          setErrorMsg(errorData.message);
          alert(errorData.message);

        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  

  return (
    <>
      <div className="verify-email-container">
        <div className="check-email-title">
          <h3>Verify Email</h3>
          <p>Please enter your email address</p>
        </div>
        <form action="" onSubmit={handleEmailExistCheck} className="check-email-form">
          <input type="email" name="email" placeholder="email" required />
          <button type="submit" className="submit-button">
            Verify Email
          </button>
        </form>
      </div>
      {/* if emailIsVerified is true, display the OTP Popup */}
      <div>{emailIsVerified ? <OTPPopup closePopUp={handleOTPClose} userEmail={userEmail}/> : null}</div>
      
      {/* {errorMsg && (
        <div className="resetpassword-error-popup">
          <p>{errorMsg}</p>
          <button onClick={() => setErrorMsg("")}>Close</button>
        </div>
      )} */}
      
    </>
  );
};

export default VerifyEmailPage;
