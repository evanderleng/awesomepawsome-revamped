import React, { useContext, useState, useEffect } from "react";
import "./IndividualProduct.css";
import axiosInstance from "../../../axiosConfig";
import { StoreContext } from "../../context/StoreContext";
// import AverageStarRating from './AverageStarRating'; // Assuming AverageStarRating component exists
// import useAverageRating from './UseAverageRating'; // Assuming useAverageRating hook is defined

const IndividualProduct = ({
  id,
  brand,
  name,
  weight,
  price,
  description,
  ingredients,
  petSize,
  imageURL,
}) => {
  const { isLogin } = useContext(StoreContext);

  const [notification, setNotification] = useState("");
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await axiosInstance.get(
          "http://127.0.0.1:4000/api/cart/getCart"
        );
        console.log("Fetched cart data:", cartResponse.data); // Debug: log the fetched data

        const hasCartResponse = await axiosInstance.get(
          "http://127.0.0.1:4000/api/cart/hasCart"
        );

        const hasCart = hasCartResponse.data.cart;
        if (hasCart) {
          // Check if the current product is in the cart
          const productInCart = cartResponse.data.some(
            (item) => item.product_id === id
          );
          setInCart(productInCart);
        } 
      } catch (error) {
        console.error("Error fetching cart data:", error); // Debug: log the error
      }
    };
    if (isLogin){fetchCartData();}
  }, [id]);

  const addToCart = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const csrfToken = sessionStorage.getItem("csrfToken"); // Retrieve the token from sessionStorage

      const cartData = {
          product_id: id,
          quantity: "1",
          csrf_token: csrfToken // Include the CSRF token in the request body
      };

      const response = await axiosInstance.post(
        "/cart/updateCart",
        cartData,
      );
      console.log("Cart updated successfully:", response.data);

      // Show notification
      setNotification("Item added to cart successfully!");
      setInCart(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="individual-product-container">
      {notification && <div className="notification">{notification}</div>}
      <div className="product-content">
        <div className="product-img">
          <img src={imageURL} alt="" />
        </div>

        <div className="product-details">
          <div className="product-title">
            <h1>{name}</h1>
          </div>
          <div className="product-brand">
            <p>{brand}</p>
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
          <div className="product-ingredients">
            <h3>Ingredients</h3>
            <p>{ingredients}</p>
          </div>
          <div className="product-weight">
            <h3>Weight</h3>
            <p>{weight}kg</p>
          </div>
          <div className="product-breed-size">
            <h3>Pet Size</h3>
            <p>{petSize}</p>
          </div>
          <div className="product-price">
            <h3>Subscription Price</h3>
            <p>${price} / Month</p>
          </div>
          {isLogin && (
            <div className="add-to-cart">
              <button onClick={addToCart} disabled={inCart}>
                {inCart ? "Added To Cart" : "Add To Cart"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
