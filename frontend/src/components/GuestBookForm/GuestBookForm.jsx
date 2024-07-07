import React, { useContext, useState, useEffect } from 'react';
import './GuestBookForm.css';
import axiosInstance from "../../../axiosConfig";
import { StoreContext } from "../../context/StoreContext";

const GuestBookForm = ({ }) => {
  const [comment, setComment] = useState('');
  const { isLogin } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/api/book/addBook";
    const csrfToken = sessionStorage.getItem("csrfToken"); // Retrieve the token from sessionStorage
    axiosInstance.post(url, { csrf_token: csrfToken, message: comment })
      .then(res => {
        setComment("")
      })
      .catch(err => {
        // console.log(err)
        if (err.response.data.path) { //path exists, let user know which input is incorrect
          alert(err.response.data.path + ": " + err.response.data.message);
        } else {
          alert(err.response.data.message);
        }
      })
  };


  return (

    {
      ...isLogin ?
        <form className="guest-book-form">
          <h4>Write a Message!</h4>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" onClick={handleSubmit} className="submit-button">Submit Review</button>
        </form>
        :
        <div><p>Please log in to write in the guest book</p></div>
    }
  );
};

export default GuestBookForm;