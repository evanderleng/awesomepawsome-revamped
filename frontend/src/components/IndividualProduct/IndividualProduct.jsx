import React from "react";
import "./IndividualProduct.css";
import { assets, dog_food_list } from "../../assets/assets";
import dog_food_image from "../../assets/dog_food_1.jpg";

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
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
