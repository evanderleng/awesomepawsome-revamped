import React from 'react'
import './CustomerReview.css'

const CustomerReview = ({key, rating, createdAt, comment, username, avatar}) => {

    // Parse the ISO string into a Date object
  const date = new Date(createdAt);

  // Format the date to have proper date 
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });


  return (
    <div className="customer-review-container">
        <div>
            <p>{username}</p>
            <img height="50" width="50" src={avatar}></img>
        </div>
        <div className="customer-review">
            <p>{comment}</p>
            <p className='comment-date'>{formattedDate}</p>
        </div>
        <div className="comment-date">
        </div>
        <div className="customer-rating">
            <p>{rating} / 10</p>
        </div>
    </div>
  )
}


export default CustomerReview
