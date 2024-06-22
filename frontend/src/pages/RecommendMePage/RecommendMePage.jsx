import React from 'react'
import './RecommendMePage.css'
import RecommendProduct from '../../components/RecommendProduct/RecommendProduct'

const RecommendMePage = () => {
  return (
    <div>
      <RecommendProduct petIsRegistered={false}/>
    </div>
  )
}

export default RecommendMePage
