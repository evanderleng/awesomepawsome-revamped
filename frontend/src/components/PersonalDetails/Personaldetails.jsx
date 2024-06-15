import React from 'react';

const PersonalDetails = () => {
  return (
    <div>
      <h1>Personal Details</h1>
      <div className="personal-info">
        <h2>Name: <span className="placeholder">Your Name</span></h2>
        <p>Email: <span className="placeholder">your.email@example.com</span></p>
        <p>Phone: <span className="placeholder">123-456-7890</span></p>
        <p>Address: <span className="placeholder">Your address...</span></p>
      </div>
      <div className="personal-bio">
        <h2>Bio</h2>
        <p>Short biography about yourself...</p>
      </div>
    </div>
  );
};


export default PersonalDetails;