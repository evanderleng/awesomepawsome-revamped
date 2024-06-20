import React, { useState } from 'react'
import './ProductPage.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'


const ProductPage = () => {

      /*breedSize is the state, setbreedSize is the function that sets the state*/
  const [breedSize, setBreedSize] = useState("All");


  return (
    <div className='place-order'>

      {/* you are passing both the state and the setter to ExploreMenu */}
      <ExploreMenu breedSize={breedSize} setBreedSize={setBreedSize}/>  

      {/*you are passing state of breedSize to FoodDisplay component*/}
      <FoodDisplay breedSize={breedSize}/>

    </div>
  )
}

export default ProductPage
