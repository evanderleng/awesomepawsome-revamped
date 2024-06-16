import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link, useLocation } from 'react-router-dom';


const FoodItem = ({id, name, price, description, image}) => {
    
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
    
    
    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                {/* direct to individual product page upon click */}
                <Link to={"/individualProductPage"}><img className='food-item-image' src={image} alt=""></img></Link>   
                {/* if there are no item count (itemCount = 0), display just the + sign, else display both + - and the item count */}
                {!cartItems[id]  
                    ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white}></img>  // if add, call addtocart function (refer to storecontext for functionality)
                    :<div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt=''></img>
                        <p>{cartItems[id]}</p>
                        <p>Item is {id}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt=''></img>

                    </div>
            }
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt=''/>
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        
        </div>
    )
}

export default FoodItem
