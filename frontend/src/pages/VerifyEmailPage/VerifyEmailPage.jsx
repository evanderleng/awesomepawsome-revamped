import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../components/LoginPopup/LoginPopup.css";
import OTPPopup from "../../components/OTPPopup/OTPPopup";
import "./VerifyEmailPage.css";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";


const VerifyEmailPage = () => {
  // state to check if email is verified or not, use to display pop up for OTP
  const [emailIsVerified, setEmailIsVerified] = useState(false);

  // state for error message
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageParts, setErrorMessageParts] = useState([]);

  // state for passing email over to OTPPopup.jsx
  const [userEmail, setUserEmail] = useState('');

  // Check if user exists
  const [userExists, setUserExists] = useState(null);


  // state to display loading icon
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);


  const navigate = useNavigate();

  const handleOTPClose = () => {
    setEmailIsVerified(false);
  }

  const handleEmailExistCheck = async (e) => {
    e.preventDefault();

    setShowLoadingIcon(true);

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

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
        setShowLoadingIcon(false);


        if (response.status === 404) { //user account with email does not exist
          const errorMessage = "User with specified email does not exist. Click below to create new user";
          const errorMessageParts = errorMessage.split(". ");

          console.log("Error:", errorMessage);
          setErrorMessage(errorMessage);
          setErrorMessageParts(errorMessageParts)
          setUserExists(false);
          setSuccessMessage('');
        }
        else if (response.status === 200) { // user account with email exists
          setSuccessMessage("Success! Sending 2FA token...");
          setErrorMessage('');
          setUserExists(true);
          console.log("Email Exists, sending OTP");
          const result = await response.json();
          console.log("Message:", result.message); // debugging
          setEmailIsVerified(true);
        }
        else {
          console.error("Error:", error);
          setErrorMessage('An error occurred. Please try again.');
          setSuccessMessage('');
        }
    } 
    catch (error) {
        console.error("Error:", error);
    }
  };

  const handleCreateUserClick = () => {
    setShowLoginPopup(true);
    console.log(`showLoginPopup: ${showLoginPopup}`)
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
          <div>
            {errorMessage && (
              <p className='error-message'>
                {errorMessageParts.map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < errorMessageParts.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            )}
            {successMessage && <p className='success-message'>{successMessage}</p>}
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Verify Email
            </button>
            {userExists === false && (
              <button type="button" className="create-user-button" onClick={() => navigate('/')}>
                Create User
              </button>
            )}
          </div>
        </form>
      </div>
      {/* if emailIsVerified is true, display the OTP Popup */}
      <div>{emailIsVerified ? <OTPPopup closePopUp={handleOTPClose} userEmail={userEmail}/> : null}</div>
      {/* <div>{showLoginPopup ? <LoginPopup setShowLogin={setShowLoginPopup} initialState="Sign Up" /> : null} </div> */}
      
      {/* {errorMsg && (
        <div className="resetpassword-error-popup">
          <p>{errorMsg}</p>
          <button onClick={() => setErrorMsg("")}>Close</button>
        </div>
      )} */}

      {/* loading icon pop up depending on state */}
      {showLoadingIcon && <LoadingIcon/>}

    </>
  );
};

export default VerifyEmailPage;
