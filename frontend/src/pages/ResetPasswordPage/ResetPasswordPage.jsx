import React, { useState } from 'react';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      setSuccessMessage('');
    } else {
      // Submit the form (e.g., send data to the server)
      console.log('Passwords match. Form can be submitted.');
      setErrorMessage('');
      setSuccessMessage('Password has been successfully reset.');
      
      // Additional logic for password reset can be added here
    }
  };

  return (
    <div className='reset-password-container'>
      <div className='reset-password-title'>
        <h3>Set New Password</h3>
        <p>Please enter your new password below.</p>
      </div>
      <form onSubmit={handleSubmit} className='reset-password-form'>
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
    </div>
  );
};

export default ResetPasswordPage;
