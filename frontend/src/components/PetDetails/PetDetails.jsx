import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon

const PetDetails = ({ petDetails, setPetDetails }) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetDetails({ ...petDetails, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    // Add save logic here, e.g., API call to update pet details
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
              value={petDetails.petType}
              onChange={handleChange}
              placeholder="Enter your pet's breed"
            />
          </label>

          <label>
            Age:
            <input
              type="text"
              name="petAge"
              value={petDetails.petType}
              onChange={handleChange}
              placeholder="Enter your pet's age"
            />
          </label>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {petDetails.petName}</p>
          <p><strong>Breed:</strong> {petDetails.petBreed}</p>
          <p><strong>Age:</strong> {petDetails.petAge}</p>
          <p><strong>Size:</strong> {petDetails.petSize}</p>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
