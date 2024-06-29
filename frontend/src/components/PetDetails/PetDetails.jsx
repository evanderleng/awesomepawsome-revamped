import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure axios is properly imported
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon
import axiosInstance from '../../../axiosConfig'


  const breedOptions = [
    "Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Boxer"
  ];

  const ageOptions = [
      "Puppy", "Junior", "Adult", "Senior"
  ];

  const sizeOptions = [
      "Small", "Medium", "Large", "Giant"
  ];

  const PetDetails = () => {
    const [petDetails, setPetDetails] = useState({
      petName: '',
      petBreed: '',
      petAge: '',
      petSize: ''
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      const fetchProfile = () => {
        const url = "http://127.0.0.1:4000/api/user/getProfile";
        axiosInstance.get(url)
          .then(res => {
            console.log('Data:', res.data);
            if (res.data.petDetails) {
              setPetDetails(res.data.petDetails);
            }
          })
          .catch(err => console.error('Error:', err));
      };
    
      fetchProfile();
    }, []);
    

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetDetails({ ...petDetails, [name]: value });
  };

  const handleSave = () => {
    // Ensure to structure the body as expected by your API
    const url = "http://127.0.0.1:4000/api/user/editProfile";
    axiosInstance.post(url, { petDetails: petDetails })
        .then(response => {
            console.log('Pet details saved successfully:', response.data);
            setEditMode(false);  // Only exit edit mode if the save is successful
        })
        .catch(error => {
            console.error('Error saving pet details:', error);
        });
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
         <form onSubmit={e => e.preventDefault()}>
         <label>
             Pet Name:
             <input type="text" name="petName" value={petDetails.petName} onChange={handleChange} placeholder="Enter your pet's name" />
         </label>
         <label>
             Breed:
             <select name="petBreed" value={petDetails.petBreed} onChange={handleChange}>
                 {breedOptions.map(breed => (
                     <option key={breed} value={breed}>{breed}</option>
                 ))}
             </select>
         </label>
         <label>
             Age:
             <select name="petAge" value={petDetails.petAge} onChange={handleChange}>
                 {ageOptions.map(age => (
                     <option key={age} value={age}>{age}</option>
                 ))}
             </select>
         </label>
         <label>
             Size:
             <select name="petSize" value={petDetails.petSize} onChange={handleChange}>
                 {sizeOptions.map(size => (
                     <option key={size} value={size}>{size}</option>
                 ))}
             </select>
         </label>
         <button type="button" onClick={handleSave}>Save</button>
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
