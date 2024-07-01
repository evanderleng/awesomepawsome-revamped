import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from "react-router-dom";



const LoginPopup = ({ setShowLogin }) => {

  // to navigate to another page (can be set)
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Login");

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
    

    try {
      const response = await fetch("http://127.0.0.1:4000/api/user/addUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User created:", result);
        // Optionally close the popup or clear the form
        setShowLogin(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg(error.message);
    }
  };

  // function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const password = formData.get("password");

    try {
      const response = await fetch("http://127.0.0.1:4000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          password: password,
        }),
      });

      // if response ok (login successful), do the following
      if (response.ok) {
        console.log("User Logged In");
        const result = await response.json();
        console.log("User Logged In:", result); // debugging

        const receivedToken = result.token;

        // Store the token in a cookie
        // secure: true means cookie is only sent over HTTPS
        // sameSite: strict means the cookie is not sent with cross-site requests
        Cookies.set("authToken", receivedToken, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        // Optionally, trigger a UI update or redirect
        console.log("Token stored in cookies:", receivedToken);

        setShowLogin(false); // set state to false to remove the popup
        setIsLogin(true); // set state to true to show that user is logged in
        setUserIsAdmin(result.admin); // set state to show if it is admin or not
        navigate('/'); // redirect to home upon login


        //
        localStorage.setItem("isAdmin", result.admin ? true : false);

        console.log("User ID: ", result._id);
        console.log("Is Admin?: ", result.admin);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to Login.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg(error.message);
    }
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
          <input type="text" name="name" placeholder="Your Username" required />
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
    </div>
  );
};

export default LoginPopup;
