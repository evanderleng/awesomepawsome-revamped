import React from 'react';
import './FoodItem.css';
import { Link } from 'react-router-dom';
import AverageStarRating from './AverageStarRating';
import useAverageRating from './UseAverageRating';

const FoodItem = ({ id, brand, name, weight, price, description, ingredients, petSize, imageURL, rating, ratingCount }) => {
    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img src={imageURL} alt="food-item" className="food-item-image" />
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p className='food-item-name'>{name}</p>
                    
                    <div className='food-item-rating'>
                        <AverageStarRating rating={rating} />
                        <p className='food-item-rating-count'>({ratingCount} reviews)</p>
                    </div>
                </div>
                <p className='food-item-price'>${typeof price === 'number' ? price.toFixed(2) : '0.00'}</p>

                <Link to={`/product/${id}`} state={{ id, brand, name, weight, price, rating, ratingCount, description, ingredients, petSize, imageURL }}>
                    <button className='button'>
                        More Info
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FoodItem;
