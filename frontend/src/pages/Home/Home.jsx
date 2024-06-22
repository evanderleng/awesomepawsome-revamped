import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import HomePageSteps from '../../components/HomePageSteps/HomePageSteps'


const Home = () => {


  return(
    <>
     <div className='home'>
      <Header/>
    <hr/>
      <HomePageSteps stepNumber={1} imageLink="test" title="Fill Up Your Pet Data" description="Tell us more about your pet such as their breed, age, weight and more so that we can recommend you the best option for your pet!"/>
      <HomePageSteps stepNumber={2} imageLink="test" title="Select A Plan" description="description here"/>
      <HomePageSteps stepNumber={3} imageLink="test" title="Make Payment" description="description here"/>
    
    </div>

    </>
  )
}

export default Home