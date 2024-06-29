import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig'; // Use the configured axios instance
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
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

      // Check if the cart list exists and is an array
      if (!Array.isArray(cartResponse.data)) {
        console.error("Invalid cart data structure:", cartResponse.data);
        throw new Error("Invalid cart data structure");
      }

      // Log product_name, price, and quantity for each item in the cart list
      cartResponse.data.forEach(item => {
        console.log(`Product Name: ${item.product_name}, Price: ${item.price}, Quantity: ${item.quantity}`);
      });

      const cartItems = cartResponse.data.map(item => ({
        id: item.product_id,
        title: item.product_name, // Use product name
        price: parseFloat(item.price), // Ensure price is a number
        quantity: item.quantity,
        selected: false, // Initialize all items as not selected
        image: 'placeholder.jpg' // Replace with actual product image if available
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

      const response = await axiosInstance.post('/cart/updateCart', cartData);
      console.log("Cart updated successfully:", response.data); // Debug: log the success response
      fetchCartData(); // Re-fetch cart data to reflect changes
    } catch (error) {
      console.error("Error updating cart:", error.response ? error.response.data : error.message); // Debug: log the error
    }
  };

  const updateQuantity = (id, newQuantity) => {
    handleAddToCart(id, newQuantity);
  };

  const removeItem = (id) => {
    handleAddToCart(id, 0);
  };

  const toggleSelection = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const subtotal = items.reduce((acc, item) => item.selected ? acc + item.quantity * item.price : acc, 0);
  const deliveryCharge = 15.00;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className='cart'>
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <CartItem
              key={item.id} // Ensure each item has a unique key prop
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
