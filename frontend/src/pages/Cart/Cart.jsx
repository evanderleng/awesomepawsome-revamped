import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosConfig";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import cartEmptyImg from "../../assets/cart-empty.png";
import "./Cart.css";


const Cart = () => {
  const [items, setItems] = useState([]);
  
  const [isReady, setIsReady] = useState();
  let [key, setKey] = useState(1);

  const [success, setSuccess] = useState(false);

  const notifySuccess = async (completed) => {
    setSuccess(completed)
  }


  useEffect(() => {
    setIsReady(false)
    fetchCartData();

  }, []);

  const fetchCartData = async () => {
    try {
      // check if cart exists before trying to fetch
      const hasCartResponse = await axiosInstance.get(
        "/api/cart/hasCart",
      );

      const hasCart = hasCartResponse.data.cart;
      if (hasCart) {
        const cartResponse = await axiosInstance.get(
          "/api/cart/getCart",
        );
        console.log("Fetched cart data:", cartResponse.data); // Debug: log the fetched data

        // Log product_name, price, and quantity for each item in the cart list
        cartResponse.data.forEach((item) => {
          console.log(
            `Product Name: ${item.product_name}, Price: ${item.price}, Quantity: ${item.quantity}`,
          );
        });

        const cartItems = cartResponse.data.map((item) => ({
          id: item.product_id,
          title: item.product_name,
          price: parseFloat(item.price),
          quantity: parseFloat(item.quantity),
          selected: false, // Initialize all items as not selected
          image: item.imageURL,
        }));

        setItems(cartItems);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error); // Debug: log the error
    }
  };

  const handleAddToCart = async (product_id, quantity) => {
    try {
      const csrfToken = sessionStorage.getItem("csrfToken"); // Retrieve the token from sessionStorage
      const cartData = {
        product_id: product_id,
        quantity: quantity,
        csrf_token: csrfToken // Include the CSRF token in the request body
      };

      // Log the payload before sending
      console.log("Sending payload:", cartData);

      const response = await axiosInstance.post("api/cart/updateCart", cartData);
      console.log("Cart updated successfully:", response.data); // Debug: log the success response
      fetchCartData(); // Re-fetch cart data to reflect changes
      setKey(prev => prev + 1);
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response ? error.response.data : error.message,
      ); // Debug: log the error
    }
  };

  const updateQuantity = (id, newQuantity) => {
    handleAddToCart(id, newQuantity);
    // Update the state directly to reflect changes immediately in the UI
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );

  };

  const removeItem = (id) => {
    handleAddToCart(id, 0);
    // Update the state directly to reflect changes immediately in the UI
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  const clearCart = (orderList) => {
    console.log(orderList);
    orderList.forEach((item) => {
      removeItem(item.product_id);
    });
  };

  const getOrderList = () => {
    const selectedItems = items.filter((item) => item.selected);
    const orderList = selectedItems.map((item) => {
      return { product_id: item.id, quantity: item.quantity };
    });
    return JSON.stringify(orderList);
  };



  const toggleSelection = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const subtotal = items.reduce(
    (acc, item) => (item.selected ? acc + item.quantity * item.price : acc),
    0,
  );
  const deliveryCharge = 15.0;
  const grandTotal = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <img
          src={cartEmptyImg}
          alt="Empty Cart"
          style={{ width: "150px", height: "150px" }}
        />
        <h2>YOUR CART IS EMPTY</h2>
        <p>Looks like you have not added anything to your cart.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-content">

        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={(newQuantity) =>
                updateQuantity(item.id, newQuantity)
              }
              // toggleSelection={() => toggleSelection(item.id)}
              removeItem={() => removeItem(item.id)}
            />
          ))}
        </div>
        <div className="checkout">

          <CheckoutForm key={key} order={items}></CheckoutForm>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
