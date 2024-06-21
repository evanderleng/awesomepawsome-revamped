// import React from 'react';

// const PersonalDetails = () => {
//   return (
//     <div>
//       <h1>Personal Details</h1>
//       <div className="personal-info">
//         <h2>Name: <span className="placeholder">Your Name</span></h2>
//         <p>Email: <span className="placeholder">your.email@example.com</span></p>
//         <p>Phone: <span className="placeholder">123-456-7890</span></p>
//         <p>Address: <span className="placeholder">Your address...</span></p>
//       </div>
//       <div className="personal-bio">
//         <h2>Bio</h2>
//         <p>Short biography about yourself...</p>
//       </div>
//     </div>
//   );
// };


// export default PersonalDetails;

import React from 'react';

const PersonalDetails = ({ personalDetails, setPersonalDetails }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  return (
    <div>
      <h2>Personal Details</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={personalDetails.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={personalDetails.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Address:
          <input
            type="address"
            name="address"
            value={personalDetails.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </label>
      </form>
    </div>
  );
};

export default PersonalDetails;
