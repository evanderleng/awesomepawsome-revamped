import React, { useContext, useRef, useState } from "react";
import "./LoginOTPPopup.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Cookies from 'js-cookie';


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

    // Implement OTP Logic here
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          otpToken: otpSubmit,
        }),
      });

      // if response ok (email address exist), do the following
      if (response.ok) {
        console.log("OTP Success");
        const result = await response.json();
        console.log("Message:", result.message); // debugging

        // store JWT token into Cookie
        const receivedJWTToken = result.jwt_token;  // received JWT Token from response
        const receivedCSRFToken = result.csrf_token; // received csrf token from response

        // Store the token in a cookie
        // secure: true means cookie is only sent over HTTPS
        // sameSite: strict means the cookie is not sent with cross-site requests
        Cookies.set("authToken", receivedJWTToken, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        // Optionally, trigger a UI update or redirect
        console.log("Token stored in cookies:", receivedJWTToken);


        sessionStorage.setItem('csrfToken', receivedCSRFToken);

        setIsLogin(true);
        setShowLogin(false);
        setUserIsAdmin(result.admin); // set state to show if it is admin or not
        localStorage.setItem("isAdmin", result.admin ? true : false);
        navigate('/');  // navigate to homepage if you're somewhere else
      } else {
        alert("Wrong OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: ", error);
    }




    // Implement OTP verification logic here
    // try {
    //   const response = await fetch("/api/email/sendResetPasswordEmail", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: userEmail,
    //       otpToken: otpSubmit,
    //     }),
    //   });

    //   // if response ok (email address exist), do the following
    //   if (response.ok) {
    //     console.log("OTP Success");
    //     const result = await response.json();
    //     console.log("Message:", result.message); // debugging
    //     setResetPasswordOTPAuthenticated(true); // set this true so that reset password page is now active
    //     setLinkHasBeenSent(true);
    //   } else {
    //     alert("Wrong OTP");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="backdrop">
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
      </div>
    </div>
  );
};

export default LoginOTPPopup;
