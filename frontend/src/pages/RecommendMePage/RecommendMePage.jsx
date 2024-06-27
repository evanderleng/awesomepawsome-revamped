import React, { useContext } from 'react'
import './RecommendMePage.css'
import RecommendProduct from '../../components/RecommendProduct/RecommendProduct'
import { StoreContext } from '../../context/StoreContext'


const RecommendMePage = () => {

  // use storedContext to check for islogin state
  const {isLogin, setIsLogin, petIsRegistered, setPetIsRegistered} = useContext(StoreContext)


  return (
    <>
    <div className="registration-container">
    {isLogin 
    ?  petIsRegistered 
          ? <RecommendProduct petIsRegistered={true} isLogin={true}/>
          : <RecommendProduct petIsRegistered={false} isLogin={true}/>
    : <RecommendProduct petIsRegistered={false} isLogin={false}/>
  }

    </div>
    </>
  )
}

export default RecommendMePage
