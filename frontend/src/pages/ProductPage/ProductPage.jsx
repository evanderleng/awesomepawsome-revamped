import React, { useState } from 'react'
import './ProductPage.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'


const ProductPage = () => {

      /*category is the state, setCategory is the function that sets the state*/
  const [category, setCategory] = useState("All");


  return (
    <div className='place-order'>

      {/* you are passing both the state and the setter to ExploreMenu */}
      <ExploreMenu category={category} setCategory={setCategory}/>  

      {/*you are passing state of category to FoodDisplay component*/}
      <FoodDisplay category={category}/>

    </div>
  )
}

export default ProductPage
