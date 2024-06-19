import React from 'react'
import './ExploreMenu.css'
import { dog_breedSize_list } from '../../assets/assets'


const ExploreMenu = ({breedSize, setBreedSize}) => {
  return(
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectablea array of dishes crafted with love</p>
        <div className='explore-menu-list'>
            {dog_breedSize_list.map((item, index)=>{
                return(
                    <div onClick={() => setBreedSize(prev => prev === item.breedSize ? "All" : item.breedSize)} key={index} className='explore-menu-list-item'>
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

export default ExploreMenu