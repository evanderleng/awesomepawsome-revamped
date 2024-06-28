import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon

const PetDetails = () => {
  const [petDetails, setPetDetails] = useState({
    petName: '',
    petBreed: '',
    petAge: '',
    petSize: ''
  });
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:4000/api/user/getProfile')
      .then(response => {
        // Set pet details if they exist, otherwise keep initial empty values
        if (response.data && response.data.petDetails) {
          setPetDetails(response.data.petDetails);
        }
      })
      .catch(err => {
        console.error('Error fetching pet details:', err);
        // Optionally handle the error, or ignore if not needed
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetDetails({ ...petDetails, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    // Optionally, make an API call here if you need to save changes to the server
  };

  return (
    <div className="pet-details">
      <div className="title-container">
        <h2>Pet Details</h2>
        <button className="edit-button" onClick={() => setEditMode(!editMode)}>
          <FaPencilAlt /> Edit
        </button>
      </div>
      {editMode ? (
        <form>
          <label>
            Pet Name:
            <input
              type="text"
              name="petName"
              value={petDetails.petName}
              onChange={handleChange}
              placeholder="Enter your pet's name"
            />
          </label>
          <label>
            Breed:
            <input
              type="text"
              name="petBreed"
              value={petDetails.petBreed}
              onChange={handleChange}
              placeholder="Enter your pet's breed"
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              name="petAge"
              value={petDetails.petAge}
              onChange={handleChange}
              placeholder="Enter your pet's age"
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              name="petSize"
              value={petDetails.petSize}
              onChange={handleChange}
              placeholder="Enter your pet's size"
            />
          </label>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {petDetails.petName || "Please input details"}</p>
          <p><strong>Breed:</strong> {petDetails.petBreed || "Please input details"}</p>
          <p><strong>Age:</strong> {petDetails.petAge || "Please input details"}</p>
          <p><strong>Size:</strong> {petDetails.petSize || "Please input details"}</p>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
