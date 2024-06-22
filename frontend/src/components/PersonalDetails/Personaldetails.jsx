import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon

const PersonalDetails = ({ personalDetails, setPersonalDetails }) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    // Add save logic here, e.g., API call
  };

  return (
    <div className="personal-details">
      <h2>Personal Details</h2>
      {editMode ? (
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
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <div>
           <button onClick={() => setEditMode(true)}>
            <FaPencilAlt /> Edit
          </button>
          <p><strong>Name:</strong> {personalDetails.name}</p>
          <p><strong>Email:</strong> {personalDetails.email}</p>
         
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
