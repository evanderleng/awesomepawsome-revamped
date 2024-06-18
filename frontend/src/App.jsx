import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ProductPage from './pages/ProductPage/ProductPage'
import IndividualProductPage from './pages/IndividualProductPage/IndividualProductPage'
import RecommendMePage from './pages/RecommendMePage/RecommendMePage'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)


  return(
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div className='app'>
      {/* this navbar will be applied throughout the entire app (all pages) */}
      <Navbar setShowLogin={setShowLogin}/>

      {/* set routes here (which page to go where) 
          - remember to import the page that you are navigating to 
          - this is the first step to do before applying the navigation throughout the entire web application (like navbar)
      
          some routes have id in their URL parameter if they want to pass certain information over to another page. only the ID, the rest will be passed as states
      */}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/productPage' element={<ProductPage/>} />
        <Route path='/individualProductPage' element={<IndividualProductPage/>} /> 

      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App