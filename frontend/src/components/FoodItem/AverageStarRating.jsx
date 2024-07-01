import React from 'react';

const AverageStarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="average-rating">
            <span>{rating ? rating.toFixed(1) : 'N/A'}</span>
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="star filled">★</span>
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="star empty">☆</span>
            ))}
        </div>
    );
};

export default AverageStarRating;