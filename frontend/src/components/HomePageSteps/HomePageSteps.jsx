import React from 'react'
import './HomePageSteps.css'

const HomePageSteps = (props) => {
  return (
    <div className="homepage-steps-row">
        <div className='homepage-steps'>
            <h3 className='step-number'>Step {props.stepNumber}</h3>
            <img src="" alt="" />
            <p className='step-title'>{props.title}</p>
            <p className='step-description'>{props.description}</p>
        </div>
    </div>
  )
}

export default HomePageSteps
