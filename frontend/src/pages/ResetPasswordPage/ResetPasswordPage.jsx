import React, { useState } from 'react';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordResetSucess, setPasswordResetSucess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    setSuccessMessage('Passwords match. Form can be submitted.');
    return true;
  };
  const handleBackendSubmit = async(e) => {
    e.preventDefault();

    // Directly get form data from event target (the form itself)
    const formData = new FormData(e.target);

    const token = formData.get("token")
    const newPassword = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

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
          token: token,
          newPassword: newPassword
        }),
      });

       // if response ok , do the following
       if (response.ok) {
        const result = await response.json();
        console.log("Message:", result.message); // debugging
        setPasswordResetSucess(true);

      } else {
        const errorData = await response.json();
        console.log("Error:", errorData.message);
        setPasswordResetSucess(false);
        setErrorMsg(errorData.message);
        alert(errorData.message);
      }
    }
    catch {
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
      <form onSubmit={handleSubmit} className='reset-password-form'>
        <input type="hidden" name="token" id="token" value=""></input>
        <div className='form-group'>
          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            id='password'
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {successMessage && <p className='success-message'>{successMessage}</p>}
        <button type='submit' className='submit-button'>Reset Password</button>
      </form>
      <script>
        {`
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get('token');
          document.getElementById('token').value = token;
        `}
      </script>
    </div>
  );
};

export default ResetPasswordPage;
