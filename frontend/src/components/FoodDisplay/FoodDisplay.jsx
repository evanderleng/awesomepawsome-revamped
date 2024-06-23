import React, { useContext, useEffect, useState } from 'react'
import  './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({breedSize}) => {

    // this lets you use the stored context that is shared across the app (Debugging Purpose, fake data)
    // const {dog_food_list} = useContext(StoreContext)

      // set state for list of products after obtaining them from API Request
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
    try {
    const response = await fetch('http://127.0.0.1:4000/api/product/getProduct?brand=Caesar');
    console.log("Response: ", response);
    if (!response.ok) {
    throw new Error("Network response was not ok.");
    }
        // parse the JSON data from the response
        const data = await response.json();
        
        // save the data into the state "products" to use 
        setProducts(data);
    
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
    }, []);




  return (
    <div className='food-display' id='food-display'>
      <h2>Here's what we have!</h2>
      <div className='food-display-list'>
        {/* depending on how many items in dog_food_list, it will loop through and display all */}
        {products.map(product => {
          if(breedSize === "All" || breedSize===product.breedSize){   //if breedSize was all or that breedSize was called, it will display that particular food for that size
            return <FoodItem id={product._id} brand={product.brand} name={product.name} weight={product.weight} price={product.price} rating={product.rating} ratingCount={product.ratingCount} 
            breedSize={product.breedSize} description={product.description} ingredients={product.ingredients}/>
          }
        } )}
      </div>
    </div>
  )
}

export default FoodDisplay

