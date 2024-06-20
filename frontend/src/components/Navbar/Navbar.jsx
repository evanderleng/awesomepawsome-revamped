import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({setShowLogin}) => {
    
    // function name is setMenu, menu is the state
    const [menu, setMenu] = useState(""); // state to track the active menu item


    const location = useLocation(); // hook to get the current location (current url)
  
    // use useEffect to update the menu state based on the current URL path
    useEffect(() => {
      // extract the pathname from the location object
      const currentPath = location.pathname;
  
      // map paths to menu names
      const pathToMenuMap = {
        "/": "home",
        "/productPage": "product",
        "/recommendMePage": "recommend me",
        "/contactUs": "contact us",
        // Add more mappings as needed
      };
  
      // Determine the active menu based on the current path
      const activeMenu = pathToMenuMap[currentPath] || "home"; // Default to "home" if the path is not in the map
      setMenu(activeMenu);
    }, [location.pathname]); // update state whenever the location's pathname change


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
            </ul>
            <div className='navbar-right'>
                <div className='navbar-basket-icon'>
                    <img src={assets.basket_icon} alt=''/>
                    <div className='dot'></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>


        </div>
    )
    }

export default Navbar