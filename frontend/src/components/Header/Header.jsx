import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Header.css'
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
  return(
    <div className='header'>
      <div className='header-contents'>
        <h2>Explore our list of food for your pet!</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with love.</p>
        <Link to="/productPage"><button>View Products</button></Link>
      </div>
    </div>
  )
}

export default Header