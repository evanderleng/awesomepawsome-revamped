import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Sign Up")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Directly get form data from event target (the form itself)
        const formData = new FormData(e.target);

        // Extract data from FormData object
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://127.0.0.1:4000/api/user/addUser', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: name,
                email: email,
                password: password
              })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User created:', result);
                // Optionally close the popup or clear the form
                setShowLogin(false);
              } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create account.');
              }
            } catch (error) {
              console.error('Error:', error);
            } 
          };
    
  return (
    <div className='login-popup'>
        <form onSubmit={handleSubmit} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {/* if current state is not login, ask for the name for signing up. Do not need name for logging in  */}
                {/*for each input type, name is required for FormData*/}
                {currState==="Login"? <></> : <input type="text" name='name' placeholder='Your Name' required />}
                <input type="email" name='email' placeholder='Your Email' required />
                <input type="password" name='password' placeholder='Password' required />
            </div>
            <button type='submit'>{currState==="Sign Up" ? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login" 
            ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
            : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
            }   
        </form>
    </div>
  )
}

export default LoginPopup
