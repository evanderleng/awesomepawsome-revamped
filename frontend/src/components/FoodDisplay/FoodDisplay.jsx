import React, { useContext } from 'react'
import  './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    // this lets you use the stored context that is shared across the app
    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {/* depending on how many items in food list, it will loop through and display all */}
        {food_list.map((item, index) => {
          if(category === "All" || category===item.category){   //if category was all or that category was called, it will display that particular food
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        } )}
      </div>
    </div>
  )
}

export default FoodDisplay

