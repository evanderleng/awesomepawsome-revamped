import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');
  const [countdown, setCountdown] = useState(10); // Initialize countdown
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    setToken(tokenFromUrl);
  }, []);

  useEffect(() => {
    let timer;
    if (passwordResetSuccess) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            navigate('/'); // Redirect to the main page
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [passwordResetSuccess, navigate]);

  const handleVarChecks = (token, password, confirmPassword) => {
    if (!token) {
      setErrorMessage('Token is not present');
      setSuccessMessage('');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      setSuccessMessage('');
      return false;
    }

    setErrorMessage('');
    setSuccessMessage('');
    console.log('Passwords match. Form can be submitted.');
    return true;
  };

  const handleBackendSubmit = async (e) => {
    e.preventDefault();

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

    const token = formData.get("token");
    const newPassword = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!handleVarChecks(token, password, confirmPassword)) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:4000/api/user/resetPassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword: newPassword
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Message:", result.message);
        setPasswordResetSuccess(true);
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData.message);
        setPasswordResetSuccess(false);
        setErrorMessage(errorData.message);
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  return (
    <div className='reset-password-container'>
      <div className='reset-password-title'>
        <h3>Set New Password</h3>
        <p>Please enter your new password below.</p>
      </div>
      <form onSubmit={handleBackendSubmit} className='reset-password-form'>
        <input type="hidden" name="token" id="token" value={token} />
        <div className='form-group'>
          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {successMessage && <p className='success-message'>{successMessage}</p>}
        {passwordResetSuccess ? (
          <>
            <p className='success-message'>Password reset successfully! Redirecting to main page in {countdown} seconds...</p>
            <button type='button' className='submit-button' onClick={() => navigate('/')}>Return to Home</button>
          </>
        ) : (
          <button type='submit' className='submit-button'>Reset Password</button>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
