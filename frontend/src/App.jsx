import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ProductPage from './pages/ProductPage/ProductPage'
import Profile from './pages/Profile/Profile'
import Payment from './pages/Payment/Payment'
import IndividualProductPage from './pages/IndividualProductPage/IndividualProductPage'
import RecommendMePage from './pages/RecommendMePage/RecommendMePage'
import Error404 from './pages/Error404/Error404'
import '@fortawesome/fontawesome-svg-core/styles.css';


const App = () => {

  const [showLogin, setShowLogin] = useState(false)


  const location = useLocation(); // Get the current location


  // Check if the current path matches the error route
  const isErrorPage = !['/', '/cart', '/productPage', '/individualProductPage', '/recommendMePage', '/profile', '/payment'].includes(location.pathname);

  return(
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div className='app'>
      {/* this navbar will be applied throughout the entire app (all pages) */}
      {!isErrorPage && <Navbar setShowLogin={setShowLogin} />}

      {/* set routes here (which page to go where) 
          - remember to import the page that you are navigating to 
          - this is the first step to do before applying the navigation throughout the entire web application (like navbar)
      
          some routes have id in their URL parameter if they want to pass certain information over to another page. only the ID, the rest will be passed as states
      */}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/productPage' element={<ProductPage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/payment' element={<Payment/>} />

        <Route path='/individualProductPage' element={<IndividualProductPage/>} /> 
        <Route path='/recommendMePage' element={<RecommendMePage/>} /> 
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
    {!isErrorPage && <Footer />}
    </>
  )
}

export default App
