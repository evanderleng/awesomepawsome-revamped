import React, { useContext } from "react";
import "./IndividualProduct.css";
import axiosInstance from "../../../axiosConfig";
import { StoreContext } from "../../context/StoreContext";

const IndividualProduct = ({
  id,
  brand,
  name,
  weight,
  price,
  rating,
  ratingCount,
  description,
  ingredients,
  breedSize,
  image,
}) => {
  
  // states from storedContext
  const { isLogin } = useContext(StoreContext);

  // Handle Add to Cart Function
  const addToCart = () => {
    const handleAddToCart = async () => {
      try {
        // testing adding item to cart
        const cartData = {
          product_id: id,
          quantity: "1",
        };

        // Making a POST request to update the cart
        const response = await axiosInstance.post("/cart/updateCart", cartData);
        console.log("Cart updated successfully:", response.data);
      } catch (error) {
        console.error(
          "Error updating cart:",
          error.response ? error.response.data : error.message
        );
      }
    };
    // Call the async function to add to cart
    handleAddToCart();
  };

  return (
    <div className="individual-product-container">
      <div className="product-content">
        <div className="product-img">
          <img src={image} alt="" />
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
            <p>{weight}</p>
          </div>
          <div className="product-rating">
            <h3>Rating</h3>
            <p>{rating}</p>
          </div>
          <div className="product-breed-size">
            <h3>Breed Size</h3>
            <p>{breedSize}</p>
          </div>
          <div className="product-price">
            <h3>Subscription Price</h3>
            <p>${price} / Month</p>
          </div>
          <div className="add-to-cart">
            {isLogin && <button onClick={addToCart}>Add To Cart</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
