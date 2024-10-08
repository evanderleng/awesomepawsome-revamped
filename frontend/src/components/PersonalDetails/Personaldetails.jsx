import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon
import axiosInstance from '../../../axiosConfig'

const PersonalDetails = ({ personalDetails, setPersonalDetails }) => {
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState("");

  // Function to fetch user profile details
  const fetchProfile = () => {
    const url = "/api/user/getProfile";
    axiosInstance.get(url)
      .then(res => {
        console.log(res.data); // Log the data to see the structure
        setPersonalDetails({
          username: res.data.username,
          email: res.data.email,
          address: res.data.address,
          avatar: res.data.avatar
        });
      })
      // .catch(err => console.log(err));
      .catch(err => alert("Error: ", err));

  };

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const resetProfile = (editMode) => {
    fetchProfile()
    setEditMode(editMode)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);

    const formData = new FormData(e.target);
    let url = "/api/user/editProfile";
    axiosInstance.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      },
    })
      .then(res => {
        setNotification(res.data.message);
        fetchProfile();
        setTimeout(() => {
          setNotification("");
        }, 3000)
      })
      .catch(err => {
        if (err.response.data.path) { //path exists, let user know which input is incorrect
          alert(err.response.data.path + ": " + err.response.data.message);
        } else {
          alert(err.response.data.message);
        }
        fetchProfile();
      })
  };

  return ( 
    <div className="personal-details">
    {notification && <div className="notification">{notification}</div>}
      <div className="title-container">
        <h2>Personal Details</h2>
        <button className="edit-button" onClick={() => resetProfile(!editMode) }>
          <FaPencilAlt /> Edit
        </button>
      </div>
      {editMode ? (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label>f
            Name:
            <input
              type="text"
              name="username"
              value={personalDetails.username}
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
              type="text"
              name="address"
              value={personalDetails.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
            />
          </label>
          <label>
            Avatar:
            <input type="file" name='avatar' />
          </label>
          <input type="hidden" name="csrf_token" value={sessionStorage.getItem("csrfToken")}></input>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {personalDetails.avatar && (
            <img
              src={personalDetails.avatar}
              alt="User Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
          <div>
            <p><strong>Name:</strong> {personalDetails.username}</p>
            <p><strong>Email:</strong> {personalDetails.email}</p>
            <p><strong>Shipping Address:</strong> {personalDetails.address}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalDetails;
