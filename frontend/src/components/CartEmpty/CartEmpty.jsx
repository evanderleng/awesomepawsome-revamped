import React from 'react'
import './CartEmpty.css';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/cart-empty.png';


function CartEmpty() {

  return (
    <div className='empty-cart'>
      <img src={cartEmptyImg} alt="Empty Cart" />
      <h2>YOUR CART IS EMPTY</h2>
      <p>Looks like you have not added anything to your cart.</p>
    </div>
  );
}

export default CartEmpty;
