import React, { useState } from 'react'
import './ProductPage.css'
import FilterBreed from '../../components/FilterBreed/FilterBreed'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'


const ProductPage = () => {

      /*breedSize is the state, setbreedSize is the function that sets the state*/
  const [breedSize, setBreedSize] = useState("All");


  return (
    <div className='place-order'>

      <div className="search-bar-container">
        <form action="" className="search-bar-form">
          <input type="text" className='search-input' placeholder='Search Your Products Here...'/>
        </form>
      </div>

      {/* you are passing both the state and the setter to FilterBreed */}
      <FilterBreed breedSize={breedSize} setBreedSize={setBreedSize}/>  

      {/*you are passing state of breedSize to FoodDisplay component*/}
      <FoodDisplay breedSize={breedSize}/>

    </div>
  )
}

export default ProductPage
