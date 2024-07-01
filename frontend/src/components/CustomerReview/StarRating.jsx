import React from 'react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="customer-rating">
            <p>
                {rating}
                {[...Array(fullStars)].map((_, index) => (
                    <span åkey={`full-${index}`} className="star filled">★</span>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <span key={`empty-${index}`} className="star empty">☆</span>
                ))}
            </p>
        </div>
    );
};

export default StarRating;
