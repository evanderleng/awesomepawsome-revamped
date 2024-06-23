import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link, useLocation } from 'react-router-dom';


const FoodItem = ({id, brand, name, weight, price, rating, ratingCount, description, ingredients, breedSize}) => {
    
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
    
    
    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                {/* direct to individual product page upon click 
                    state will be what properties you wish to pass over to the other side, the other side must retrieve using location.state)
                */}
                {/* <Link to="/individualProductPage" state={{id, name, price, description, image}}>
                <img className='food-item-image' src={image} alt=""></img></Link>    */}
                {/* if there are no item count (itemCount = 0), display just the + sign, else display both + - and the item count */}


            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p className='food-item-name'>{name}</p>
                    <img src={assets.rating_starts} alt=''/>
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>${price}</p>
                <button><Link to="/individualProductPage" state={{id, brand, name, weight, price, rating, ratingCount, description, ingredients, breedSize}}>More Info</Link></button>
            </div>
        
        </div>
    )
}

export default FoodItem
