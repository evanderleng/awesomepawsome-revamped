import React from 'react'
import './FilterBreed.css'
import { dog_petSize_list } from '../../assets/assets'


const FilterBreed = ({petSize, setPetSize}) => {
  return(
    <div className='filter-breed' id='filter-breed'>
        <h1>Choose Your Breed Size</h1>
        <p className='filter-breed-text'>Indulge your furry friend with a diverse menu of delectable dog foods, each crafted with love and care to keep tails wagging.</p>
        <div className='filter-breed-list'>
            {dog_petSize_list.map((item, index)=>{
                return(
                    <div onClick={() => setPetSize(prev => prev === item.petSize ? "All" : item.petSize)} key={index} className='filter-breed-list-item'>
                        <img className={petSize === item.petSize ? "active" : ""} src={item.image} alt=""/>
                        <p>{item.petSize}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default FilterBreed