import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import cartEmptyImg from '../../assets/cart-empty.png'; 
import './Cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const cartResponse = await axiosInstance.get('http://127.0.0.1:4000/api/cart/getCart');
      console.log('Fetched cart data:', cartResponse.data); // Debug: log the fetched data

      // Log product_name, price, and quantity for each item in the cart list
      cartResponse.data.forEach(item => {
        console.log(`Product Name: ${item.product_name}, Price: ${item.price}, Quantity: ${item.quantity}`);
      });

      const cartItems = cartResponse.data.map(item => ({
        id: item.product_id,
        title: item.product_name, 
        price: parseFloat(item.price), 
        quantity: parseFloat(item.quantity), 
        selected: false, // Initialize all items as not selected
        image: 'placeholder.jpg' // TODO: Replace with actual product image when available
      }));

      setItems(cartItems);
    } catch (error) {
      console.error('Error fetching cart data:', error); // Debug: log the error
    }
  };

  const handleAddToCart = async (product_id, quantity) => {
    try {
      const cartData = {
        product_id: product_id,
        quantity: quantity
      };

      // Log the payload before sending
      console.log('Sending payload:', cartData);

      const response = await axiosInstance.post('/cart/updateCart', cartData);
      console.log("Cart updated successfully:", response.data); // Debug: log the success response
      fetchCartData(); // Re-fetch cart data to reflect changes
    } catch (error) {
      console.error("Error updating cart:", error.response ? error.response.data : error.message); // Debug: log the error
    }
  };

  const updateQuantity = (id, newQuantity) => {
    handleAddToCart(id, newQuantity);
    // Update the state directly to reflect changes immediately in the UI
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    handleAddToCart(id, 0);
    // Update the state directly to reflect changes immediately in the UI
    setItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
  };

  const toggleSelection = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const subtotal = items.reduce((acc, item) => item.selected ? acc + item.quantity * item.price : acc, 0);
  const deliveryCharge = 15.00;
  const grandTotal = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className='empty-cart'>
        <img src={cartEmptyImg} alt="Empty Cart" style={{ width: '150px', height: '150px' }} />
        <h2>YOUR CART IS EMPTY</h2>
        <p>Looks like you have not added anything to your cart.</p>
      </div>
    );
  }

  return (
    <div className='cart'>
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <CartItem
              key={item.id} 
              item={item}
              updateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
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
