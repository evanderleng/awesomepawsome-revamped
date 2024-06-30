import React, { useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import './Cart.css'; 
// import CartEmpty from '../../components/CartEmpty/CartEmpty';

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Item 1', price: 10.00, quantity: 2, selected: true },
    { id: 2, title: 'Item 2', price: 20.00, quantity: 1, selected: false },
    { id: 3, title: 'Item 3', price: 20.00, quantity: 1, selected: false },
    { id: 4, title: 'Item 4', price: 20.00, quantity: 1, selected: false }
  ]);

  const toggleSelection = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => item.selected ? acc + item.quantity * item.price : acc, 0);
  const deliveryCharge = 15.00;
  const grandTotal = subtotal + deliveryCharge;

  // if (items.length === 0) {
  //   // Return the CartEmpty component if there are no items
  //   return <CartEmpty/>
   
  // }

  return (
    <div className='cart'>
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              toggleSelection={() => toggleSelection(item.id)}
              removeItem={() => removeItem(item.id)}
            />
          ))}
        </div>
        <CartSummary subtotal={subtotal} deliveryCharge={deliveryCharge} grandTotal={grandTotal} />
      </div>
    </div>
  );
}

export default Cart;
