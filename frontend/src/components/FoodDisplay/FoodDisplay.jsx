import React, { useContext, useEffect, useState } from 'react'
import  './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import axiosInstance from "../../../axiosConfig";

const FoodDisplay = ({petSize, searchQuery}) => {

    // this lets you use the stored context that is shared across the app (Debugging Purpose, fake data)
    // const {dog_food_list} = useContext(StoreContext)

      // set state for list of products after obtaining them from API Request
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        axiosInstance({
          method: "get",
          url: '/api/product/getProduct'
        })
          .then(res => {
            setProducts(res.data);
          })
          .catch(err => {
            if (err.response.data.path){ //path exists, let user know which input is incorrect
              setErrorMsg(err.response.data.path+": "+err.response.data.message);
            } else {
              setErrorMsg(err.response.data.message);
            }
          })
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
    }, []);


  // Filter products based on breed size and search query
  const filteredProducts = products.filter(product => {
    const matchesPetSize = petSize === "All" || product.petSize === petSize;
    const matchesSearchQuery = searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPetSize && matchesSearchQuery;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Here's what we have!</h2>
      <div className='food-display-list'>
        {/* depending on how many items in dog_food_list, it will loop through and display all */}
        {/* Render the filtered list of products */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <FoodItem
              key={product._id} // Add a key prop to each item
              id={product._id}
              brand={product.brand}
              name={product.name}
              weight={product.weight}
              price={product.price}
              rating={product.rating}
              ratingCount={product.ratingCount}
              petSize={product.petSize}
              description={product.description}
              ingredients={product.ingredients}
              imageURL = {product.imageURL}
            />
          ))
        ) : (
          <p>No matching products found</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay

