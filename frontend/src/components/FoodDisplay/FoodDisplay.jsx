import React, { useContext } from 'react'
import  './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({breedSize}) => {

    // this lets you use the stored context that is shared across the app
    const {dog_food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Here's what we have!</h2>
      <div className='food-display-list'>
        {/* depending on how many items in dog_food_list, it will loop through and display all */}
        {dog_food_list.map((item, index) => {
          if(breedSize === "All" || breedSize===item.breedSize){   //if breedSize was all or that breedSize was called, it will display that particular food for that size
            return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        } )}
      </div>
    </div>
  )
}

export default FoodDisplay

