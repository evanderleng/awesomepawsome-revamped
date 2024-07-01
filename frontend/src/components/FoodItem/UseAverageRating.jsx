// useAverageRating.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAverageRating = (productId) => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(null);
        const response = await axios.get(`http://127.0.0.1:4000/api/review/getReview/?product_id=${productId}`);
        const reviews = response.data;
        
        if (Array.isArray(reviews) && reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
          setAverageRating(totalRating / reviews.length);
          setRatingCount(reviews.length);
        } else {
          setAverageRating(0);
          setRatingCount(0);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews. Please try again later.');
        setAverageRating(0);
        setRatingCount(0);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return { 
    averageRating: Math.max(0, Math.min(5, averageRating)), 
    ratingCount, 
    error 
  };
};

export default useAverageRating;