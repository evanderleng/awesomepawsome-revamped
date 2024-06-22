import React from 'react';
import './CartItem.css';

function CartItem({ item, updateQuantity, toggleSelection, removeItem }) {
  return (
    <div className='cart-item'>
      <div className="item-checkbox">
        <input type="checkbox" checked={item.selected} onChange={toggleSelection} />
      </div>
      <div className="item-content">
        <img src={item.image} alt={item.title} className='item-image' />
        <div className='item-details'>
          <h3 className='item-title'>{item.title}</h3>
          <div className='item-controls'>
            <div className='quantity-control'>
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
              <input type='text' value={item.quantity} readOnly />
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className='item-price'>${item.price.toFixed(2)}</div>
          </div>
        </div>
        <button className='remove-item' onClick={removeItem}>DELETE</button>
      </div>
    </div>
  );
}

export default CartItem;
