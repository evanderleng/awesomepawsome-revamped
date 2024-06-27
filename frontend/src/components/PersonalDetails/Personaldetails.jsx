import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon
import axiosInstance from '../../../axiosConfig'

const PersonalDetails = ({ personalDetails, setPersonalDetails }) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    setEditMode(false);
    
    e.preventDefault();
    const formData = new FormData(e.target);
    let url = "http://127.0.0.1:4000/api/user/editProfile";
    axiosInstance.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      },
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="personal-details">
      <div className="title-container">
        <h2>Personal Details</h2>
        <button className="edit-button" onClick={() => setEditMode(!editMode)}>
          <FaPencilAlt /> Edit
        </button>
      </div>
      {editMode ? (
        <form enctype="multipart/form-data" onSubmit={handleSubmit} >
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
              placeholder="Enter your delivery address"
            />
          </label>
          <label>
            Avatar:
            <input type="file" name='avatar'/>
          </label>
          <button>
            Save
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {personalDetails.name}</p>
          <p><strong>Email:</strong> {personalDetails.email}</p>
          <p><strong> Shipping Address:</strong> {personalDetails.address}</p>
        </div>
      
      )}
    </div>
  );
};

export default PersonalDetails;
