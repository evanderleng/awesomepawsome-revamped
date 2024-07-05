import React, { useState, useEffect } from 'react';
import './ReviewForm.css';
import axiosInstance from "../../../axiosConfig";

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [canReview, setCanReview] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const canReviewUrl = `http://127.0.0.1:4000/api/user/canReview/?product_id=${productId}`;
    axiosInstance({
      method: "GET",
      url: canReviewUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setCanReview(response.data.canReview)
        if (response.data.message){
          setReason(response.data.message)
        }
      })
      .catch((error) => {
        setCanReview(false)
        console.error("Error checking canReview:", error);
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:4000/api/review/addReview";
    const csrfToken = sessionStorage.getItem("csrfToken"); // Retrieve the token from sessionStorage
    axiosInstance.post(url, { product_id: productId, rating, comment, csrf_token: csrfToken})
        .then(res => {
          // console.log(res.data);
          console.log('Submitted Review!:', response.data);
          setCanReview(false); 
          alert(res.data.message);
        })
        .catch(err => {
          // console.log(err)
          if (err.response.data.path){ //path exists, let user know which input is incorrect
            alert(err.response.data.path+": "+err.response.data.message);
          } else {
            alert(err.response.data.message);
          }
        })
  };


  return (

    { ...canReview ?
      <form className="review-form">
        <h4>Write a Review</h4>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
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
      <div><p>{reason}</p></div>
    }
  );
};

export default ReviewForm;