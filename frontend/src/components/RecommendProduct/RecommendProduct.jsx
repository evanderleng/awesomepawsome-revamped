import React from "react";
import './RecommendProduct.css'
import dog_food from '../../assets/dog_food_3.png'

const RecommendProduct = ({petIsRegistered, isLogin}) => {
  if (petIsRegistered && isLogin){
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
  }
  else if(!petIsRegistered && isLogin){
    return(
      <>
      <div className="pet-not-registered-container">
       <h3>Sorry, your pet is not registered yet!</h3>
       <p>Do sign up your pet so we know what product to recommend based on their age, breed size and weight as well!</p> 
       <button>Register Your Pet Here!</button>
 
      </div>
      </>
    )
  }
  else{
    return(
      <>
      <div className="pet-not-registered-container">
       <h3>Sorry, you are not logged in!</h3>
       <p>Do log in first and remember to register your pet if you would like us to recommend you the package!</p> 
      </div>
      </>
    )
  }

  }


export default RecommendProduct;
