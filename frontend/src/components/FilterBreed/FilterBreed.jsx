import React from 'react'
import './FilterBreed.css'
import { dog_petSize_list } from '../../assets/assets'


const FilterBreed = ({petSize, setPetSize}) => {
  return(
    <div className='filter-breed' id='filter-breed'>
        <h1>Explore our menu</h1>
        <p className='filter-breed-text'>Choose from a diverse menu featuring a delectablea array of dishes crafted with love</p>
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