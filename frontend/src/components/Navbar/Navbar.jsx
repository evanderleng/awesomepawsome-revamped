import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({setShowLogin}) => {
    
    // function name is setMenu, menu is the state
    const [menu, setMenu] = useState("home");   // create state variable and initialise with home

    return(
        <div className='navbar'>
            <img src={assets.logo} alt='' className='logo'/>
            <ul className='navbar-menu'>
                {/* this means that, the class name will be active if it the state of menu is their respective name
                Example: if you hover contact us, it will set the className to be active, the rest will be empty string.
                Hence, you can adjust .active class to maybe do an underline. */}

                {/* HOW TO ADD NAV: if you want to add, just place the follow how its done for home, adding the Link as well. Importantly, set the route first in App.jsx */}
                <li onClick={() => setMenu("home")} className={menu==="home"?"active":""}><Link to="/">home</Link></li>
                <li onClick={() => setMenu("product")} className={menu==="product"?"active":""}><Link to="/productPage">product</Link></li>
                <li onClick={() => setMenu("recommend me")} className={menu==="recommend me"?"active":""}><Link to="/recommendMePage">recommend me</Link></li>
                <li onClick={() => setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</li>
                <li onClick={() => setMenu("profile")} className={menu==="profile"?"active":""}><Link to="/profile">profile</Link></li>

            </ul>
            <div className='navbar-right'>
                <div className='navbar-basket-icon'>
                    <img src={assets.basket_icon} alt=''/>
                    <div className='dot'></div>
                </div>
                <img src={assets.search_icon} alt='' className='navbar-search-icon' />
                <ul className='navbar-menu'>
                    <li className={menu === "cart" ? "active" : ""} onClick={() => setMenu("cart")}>
                        <Link to="/cart">
                            {menu === "cart" ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
                        </Link>
                    </li>
                </ul>

                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    )
    }

export default Navbar
