import React, { useContext, useEffect, useState } from "react";
import "./RecommendProduct.css";
import dog_food from "../../assets/dog_food_3.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../axiosConfig";
import { Reorder } from "@mui/icons-material";
import { StoreContext } from "../../context/StoreContext";

const RecommendProduct = ({ petIsRegistered, isLogin }) => {
  // state to store recommended product object
  const [recommendedProduct, setRecommendedProduct] = useState([]);

  // Stored Context 
  const { setPetIsRegistered } = useContext(StoreContext);

  // properties of object to pass into state 
  const id = recommendedProduct._id;
  const brand = recommendedProduct.brand;
  const name = recommendedProduct.name;
  const weight = recommendedProduct.weight;
  const price = recommendedProduct.price;
  const description = recommendedProduct.description;
  const ingredients = recommendedProduct.ingredients;
  const petSize = recommendedProduct.petSize;
  const imageURL = recommendedProduct.imageURL;

  useEffect(() => {
    const fetchRecommended = async () => {
      axiosInstance.get("api/product/getRecommended")
        .then(res => {
          setRecommendedProduct(res.data);
          setPetIsRegistered(true);
        })
        .catch(err => {
          setPetIsRegistered(false);
          if (err.response.data.path) { //path exists, let user know which input is incorrect
            alert(err.response.data.path + ": " + err.response.data.message);
          } else {
            alert(err.response.data.message);
          }
        })
    };
    if (isLogin) { fetchRecommended(); }
  }, []);


  if (petIsRegistered && isLogin) {
    return (
      <div className="recommend-product-container">
        <div className="recommend-header-title">
          <h3>Based on your pet, we recommend...</h3>
        </div>
        <div className="product-brand">
          <h3>{recommendedProduct.brand}</h3>
        </div>
        <div className="product-name">
          <p>{recommendedProduct.name}</p>
        </div>
        <div className="product-image">
          <img src={recommendedProduct.imageURL} alt="" />
        </div>
        <Link
          to={`/product/${id}`}
          state={{
            id,
            brand,
            name,
            weight,
            price,
            description,
            ingredients,
            petSize,
            imageURL,
          }}
        >
          <button className="button">
            More Info
          </button>
        </Link>
      </div>
    );
  } else if (!petIsRegistered && isLogin) {
    return (
      <>
        <div className="pet-not-registered-container">
          <h3>Sorry, we do not have enough information about your pet!</h3>
          <p>
            Do let us know more about your pet so we know what product to recommend based on
            their age, breed size and weight!
          </p>
          <Link to="/profile">
            <button>
              Register Your Pet Here!
            </button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="pet-not-registered-container">
          <h3>Sorry, you are not logged in!</h3>
          <p>
            Do log in first and remember to register your pet if you would like
            us to recommend you the package!
          </p>
        </div>
      </>
    );
  }
};

export default RecommendProduct;
