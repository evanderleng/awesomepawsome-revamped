import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Header.css'
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
  return(
    <div className='header'>
      <div className='header-contents'>
        <h2>They deserve Only the Best!</h2>
        <p>Indulge your furry friend with a diverse menu of delectable dog foods, each crafted with love and care to keep tails wagging.</p>
        <Link to="/products"><button>View Products</button></Link>
      </div>
    </div>
  )
}

export default Header