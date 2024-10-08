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
      "Small", "Medium", "Large",
  ];

  const PetDetails = () => {
    const [petDetails, setPetDetails] = useState({
      petName: '',
      petBreed: '',
      petAge: '',
      petSize: ''
    });
    const [editMode, setEditMode] = useState(false);


    const fetchProfile = () => {
      const url = "/api/user/getProfile";
      axiosInstance.get(url)
        .then(res => {
          console.log('Data:', res.data);
          if (res.data.petDetails) {
            setPetDetails(res.data.petDetails);
          }
        })
        .catch(err => console.error('Error:', err));
    };

    useEffect(() => {
      fetchProfile();
    }, []);
    

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetDetails({ ...petDetails, [name]: value });
  };

  const handleSave = () => {
    // Ensure to structure the body as expected by your API
    const url = "/api/user/editPet";
    for (const key in petDetails) {
      if (petDetails[key] == ""){
        delete petDetails[key]
      }
    }
    const csrfToken = sessionStorage.getItem("csrfToken"); // Retrieve the token from sessionStorage
    axiosInstance.post(url, { petDetails: petDetails, csrf_token: csrfToken})
        .then(response => {
            console.log('Pet details saved successfully:', response.data);
            setEditMode(false);  // Only exit edit mode if the save is successful
        })
        .catch(err => {
          if (err.response.data.path){ //path exists, let user know which input is incorrect
            alert(err.response.data.path+": "+err.response.data.message);
          } else {
            alert(err.response.data.message);
          }
          fetchProfile();
          setEditMode(false)
        })
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
             <input type="text" name="petBreed" value={petDetails.petBreed} list="breed" onChange={handleChange} placeholder="Please Select or Type"></input>
             <datalist id="breed">
                 <option disabled selected value="">- Please Select -</option>
                 {breedOptions.map(breed => (
                     <option key={breed} value={breed}>{breed}</option>
                 ))}
             </datalist>
         </label>
         <label>
             Age:
             <select name="petAge" value={petDetails.petAge} onChange={handleChange}>
                 <option disabled selected value="">- Please Select -</option>
                 {ageOptions.map(age => (
                     <option key={age} value={age}>{age}</option>
                 ))}
             </select>
         </label>
         <label>
             Size:
             <select name="petSize" value={petDetails.petSize} onChange={handleChange}>
                 <option disabled selected value="">- Please Select -</option>
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
