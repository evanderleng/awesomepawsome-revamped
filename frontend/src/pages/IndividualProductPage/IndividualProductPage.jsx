import React, { useEffect, useState } from "react";
import "./IndividualProductPage.css";
import IndividualProduct from "../../components/IndividualProduct/IndividualProduct";
import { useLocation, useParams } from "react-router-dom";
import CustomerReview from "../../components/CustomerReview/CustomerReview";
import axios from "axios";

const IndividualProductPage = () => {
  const location = useLocation();
  const {
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
  } = location.state || {}; // Destructure name and price from location.state

  // variable to store array of reviews after requesting API
  const [reviews, setReviews] = useState([]);

  // debugging purpose
  // console.log("id brought over: ", id);
  // console.log("name brought over: ", name);
  // console.log("price brought over: ", price);
  // console.log("description brought over: ", description);

  // API Call to get list of reviews for specific product
  useEffect(() => {
    const url = `http://127.0.0.1:4000/api/review/getReview/?product_id=${id}`;

    // Make the GET request with axios
    axios({
      method: "get", // HTTP method
      url: url, // URL to send the request to
      headers: {
        "Content-Type": "application/json", // Content-Type header
      },
    })
      .then((response) => setReviews(response.data)) // assuming the response is JSON and you set it to state
      // .then((response) => console.log(response.data)) // debugging

      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top-left corner of the page
  }, []); // Empty dependency array ensures this effect runs only on component mount

  // TODO: need to add image from DB
  return (
    <div className="individualProductPage">
      <IndividualProduct
        id={id}
        brand={brand}
        name={name}
        weight={weight}
        price={price}
        rating={rating}
        ratingCount={ratingCount}
        description={description}
        ingredients={ingredients}
        breedSize={breedSize}
      />

      {/*Based on the reviews state (obtained from API call), call the customer review component and pass in props*/}
      <h3 className="review-title">Reviews</h3>
      {reviews.map((review) => 
        <CustomerReview
          key={review.product_id}
          rating={review.rating}
          comment={review.comment}
          createdAt={review.createdAt}
        />
      )}
    </div>
  );
};

export default IndividualProductPage;
