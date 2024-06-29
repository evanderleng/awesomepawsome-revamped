import React from 'react'
import './VerifyEmailPage.css'

const VerifyEmailPage = () => {
  return (
    <div className='verify-email-container'>
      <div className="check-email-title">
        <h3>Verify Email</h3>
        <p>Please enter your email address</p>
      </div>
      <form action="" className='check-email-form'>
        <input type="email" name='email' placeholder='email' required/>
        <button type="submit" className='submit-button'>Verify Email</button>
      </form>
      
    </div>
  )


}

export default VerifyEmailPage
