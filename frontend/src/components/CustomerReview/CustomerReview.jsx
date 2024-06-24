import React from 'react'
import './CustomerReview.css'

const CustomerReview = ({product_id}) => {
  return (
    <div className="customer-review-container">
        <div className="customer-review">
            <p>Cesars top sirloin 100g dog food saved my life!</p>
        </div>
        <div className="customer-rating">
            <p>4</p>
        </div>
    </div>
  )
}


export default CustomerReview
