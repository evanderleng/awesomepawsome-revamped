import React from "react";
import './RecommendProduct.css'
import dog_food from '../../assets/dog_food_3.png'

const RecommendProduct = () => {
  return (
    <div className="recommend-product-container">
      <div className="recommend-header-title">
        <h3>Based on your pet, we recommend...</h3>
      </div>
      <div className="product-brand">
        <h3>Royal Canin</h3>
      </div>
      <div className="product-name">
        <p>Royal Canin for Small/Petit Dog</p>
      </div>
      <div className="product-image">
        <img src={dog_food} alt=""/>
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
  );
};

export default RecommendProduct;
