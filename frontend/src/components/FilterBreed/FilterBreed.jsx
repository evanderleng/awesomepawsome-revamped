import React from 'react'
import './FilterBreed.css'
import { dog_breedSize_list } from '../../assets/assets'


const FilterBreed = ({breedSize, setBreedSize}) => {
  return(
    <div className='filter-breed' id='filter-breed'>
        <h1>Explore our menu</h1>
        <p className='filter-breed-text'>Choose from a diverse menu featuring a delectablea array of dishes crafted with love</p>
        <div className='filter-breed-list'>
            {dog_breedSize_list.map((item, index)=>{
                return(
                    <div onClick={() => setBreedSize(prev => prev === item.breedSize ? "All" : item.breedSize)} key={index} className='filter-breed-list-item'>
                        <img className={breedSize === item.breedSize ? "active" : ""} src={item.image} alt=""/>
                        <p>{item.breedSize}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default FilterBreed