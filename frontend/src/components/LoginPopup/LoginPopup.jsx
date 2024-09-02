import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginOTPPopup from "../LoginOTPPopUp/LoginOTPPopup";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import axiosInstance from "../../../axiosConfig";



const LoginPopup = ({ setShowLogin }) => {

  // to navigate to another page (can be set)
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Login");

  // state to show popup for OTP 
  const [showOTPPopup, setShowOTPPopup] = useState(false);


  // state to store username and password typed
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state to display loading icon
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
    

  // function to close popup setShowOTPPop to false, pass into component
  const closePopUp = () => {
    setShowOTPPopup(false)
  }


  // state to set the isLogin state, obtained from StoredContext
  const {
    isLogin,
    setIsLogin,
    userId,
    setUserId,
    userIsAdmin,
    setUserIsAdmin,
  } = useContext(StoreContext);

  // state to set the error message to display if have
  const [errorMsg, setErrorMsg] = useState("");

  // to handle create account submission
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

    // Extract data from FormData object
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    

    axiosInstance.post("/api/user/addUser", 
      { username: name, password, email}
    )
    .then(res => {
      setShowLogin(false);
      alert(res.data.message)
    })
    .catch(err => {
      if (err.response.data.path){ //path exists, let user know which input is incorrect
        setErrorMsg(err.response.data.path+": "+err.response.data.message);
      } else {
        setErrorMsg(err.response.data.message);
      }
    })
  };

  // function to handle login
  const handleLogin = async (e) => {
    setShowLoadingIcon(true);
    e.preventDefault();

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const password = formData.get("password");

    // set them to the state in case need to pass over
    setUsername(name);
    setPassword(password);

    axiosInstance.post("/api/email/send2faEmail_Login", 
      { username: name, password}
    )
    .then(response => {
      setShowLoadingIcon(false);
      setShowOTPPopup(true);
    })
    .catch(err => {
      if (err.response.data.path){ //path exists, let user know which input is incorrect
        setErrorMsg(err.response.data.path+": "+err.response.data.message);
      } else {
        setErrorMsg(err.response.data.message);
      }
      setShowLoadingIcon(false);

      setTimeout(() => {
        setErrorMsg("");
      }, 3000)
    })
    
  };

  // Determine which handler to use based on currState
  // called in the onSubmit under forms
  const handleSubmit = (e) => {
    if (currState === "Sign Up") {
      handleCreateAccount(e);
    } else {
      handleLogin(e);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {/* if current state is not login, ask for the name for signing up. Do not need name for logging in  */}
          {/*for each input type, name is required for FormData*/}
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          )}
          <input type="text" name="name" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {currState == "Sign Up" ? (
          <button type="submit">Create Account</button>
        ) : (
          <button type="submit">Login</button>
        )}
        {currState === "Login" ? (
            <></>
          ) : (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}

        <div className="forget-password">
          <p>
            Forget your password?{" "}
            <span onClick={() => setShowLogin(false)}><Link to='/verifyEmailPage'>Reset Password</Link></span>
          </p>
        </div>

      </form>

      {errorMsg && (
        <div className="error-popup">
          <p>{errorMsg}</p>
          <button onClick={() => setErrorMsg("")}>Close</button>
        </div>
      )}


      {/* call OTP PopUp depending on state */}
      {showOTPPopup && <LoginOTPPopup setShowLogin={setShowLogin} closePopUp={closePopUp} username={username} password={password}/>}

      {/* loading icon pop up depending on state */}
      {showLoadingIcon && <LoadingIcon/>}

    </div>
  );
};

export default LoginPopup;
