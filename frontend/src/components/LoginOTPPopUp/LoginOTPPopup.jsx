import React, { useContext, useRef, useState } from "react";
import "./LoginOTPPopup.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Cookies from 'js-cookie';
import axiosInstance from "../../../axiosConfig";


const LoginOTPPopup = ({closePopUp, username, password, setShowLogin}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // stored context 
const {
    isLogin,
    setIsLogin,
    userId,
    setUserId,
    userIsAdmin,
    setUserIsAdmin,
    } = useContext(StoreContext);
    


  // to navigate to the next page (can set set which route to go)
  const navigate = useNavigate();

  // state for error message
  const [errorMsg, setErrorMsg] = useState("");
  const [notification, setNotification] = useState("");

  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move focus to next input
      if (index < 5 && element.value !== "") {
        inputRefs.current[index + 1].focus();
      }
    } else if (element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpSubmit = otp.join("");
    console.log("otp submitted is ", otpSubmit);

    axiosInstance.post("/api/user/login", 
      { 
        username,
        password,
        otpToken: otpSubmit
      }
    )
    .then(res => {

      setNotification(res.data.message);

      const receivedJWTToken = res.data.jwt_token;  // received JWT Token from response
      const receivedCSRFToken = res.data.csrf_token; // received csrf token from response
      
      Cookies.set("authToken", receivedJWTToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      sessionStorage.setItem('csrfToken', receivedCSRFToken);

      setIsLogin(true);
      setShowLogin(false);
      setUserIsAdmin(res.data.admin); // set state to show if it is admin or not

      localStorage.setItem("isAdmin", res.data.admin ? true : false);

      setTimeout(() => {
        setNotification("");
      }, 3000)
      //navigate('/');  // navigate to homepage if you're somewhere else
    })
    .catch(err => {
      if (err.response.data.path){ //path exists, let user know which input is incorrect
        setErrorMsg(err.response.data.path + ": " + err.response.data.message);
      } else {
        setErrorMsg(err.response.data.message);
      }
      setTimeout(() => {
        setErrorMsg("");
      }, 3000)
    })
    
  };

  return (
    <div className="backdrop">
    {notification && <div className="notification">{notification}</div>}
      <div className="otp-container">
        <button className="close-button" onClick={closePopUp}>
          ✖
        </button>
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
                onKeyUp={(e) =>
                  e.key === "Backspace" && handleBackspace(e.target, index)
                }
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {errorMsg && (
        <div className="error-popup">
          <p>{errorMsg}</p>
          <button onClick={() => setErrorMsg("")}>Close</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default LoginOTPPopup;
