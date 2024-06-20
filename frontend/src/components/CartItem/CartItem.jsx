import React from 'react';

function CartItem({ item, updateQuantity }) {
  return (
    <div className='cart-item'>
      <img src={item.image} alt={item.title} className='item-image' />
      <h3 className='item-title'>{item.title}</h3>
      <div className='quantity-control'>
        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
        <input type='text' value={item.quantity} readOnly />
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className='item-price'>${item.price.toFixed(2)}</div>
      <button className='remove-item'>x</button>
    </div>
  );
}

export default CartItem;
