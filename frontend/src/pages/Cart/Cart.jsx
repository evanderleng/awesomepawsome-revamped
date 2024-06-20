import React, { useState } from 'react';
import CartItem from '../../components/CartItem/CartItem'
import CartSummary from '../../components/CartSummary/CartSummary'
import CartEmpty from '../../components/CartEmpty/CartEmpty'


const Cart = () => {
  const [items, setItems] = useState([
    // Example items, you would likely fetch these from state or props
  ]);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const deliveryCharge = 15.00;
  const grandTotal = subtotal + deliveryCharge;

  if (items.length === 0) {
    return <CartEmpty />;  // Render the EmptyCart component when no items are in the cart
  }

  return(
    <div className='cart'>
      <h1>SHOPPING CART</h1>
      {items.map(item => (
        <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />
      ))}
      <CartSummary subtotal={subtotal} deliveryCharge={deliveryCharge} grandTotal={grandTotal} />
      <button className='proceed-button'>Proceed</button>
    </div>
  );
}

export default Cart;
