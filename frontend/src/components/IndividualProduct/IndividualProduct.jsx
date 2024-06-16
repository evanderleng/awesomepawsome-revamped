import React from "react";
import "./IndividualProduct.css";
import { assets, dog_food_list } from "../../assets/assets";
import dog_food_image from "../../assets/dog_food_1.jpg";

const IndividualProduct = () => {
  return (
    <div className="individual-product-container">
      <div className="product-content">
        <div className="product-img">
          <img src={dog_food_image} alt="" />
        </div>

        <div className="product-details">
          <div className="product-title">
            <h1>Pedigree Small Dog</h1>
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>Give your small dog the nourishment they deserve with Pedigree Small Dog Complete Nutrition. Crafted with high-quality ingredients and enriched with essential nutrients, this dog food is specially formulated to meet the unique dietary needs of small breed dogs.</p>
            <h3>Ingredients</h3>
            <p>Ground whole corn, meat and bone meal, corn gluten meal, animal fat (preserved with BHA/BHT), chicken by-product meal</p>
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
