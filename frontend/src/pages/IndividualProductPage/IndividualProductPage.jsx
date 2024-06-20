import React from 'react'
import './IndividualProductPage.css'
import IndividualProduct from '../../components/IndividualProduct/IndividualProduct'
import { useLocation, useParams } from 'react-router-dom'

const IndividualProductPage = () => {

  const location = useLocation();
  const { id, name, price, description, image} = location.state || {}; // Destructure name and price from location.state
  
  // debugging purpose
  console.log('id brought over: ', id);
  console.log('name brought over: ', name);
  console.log('price brought over: ', price);
  console.log('description brought over: ', description);
  console.log('image brought over: ', image);



  return (
    <div className='individualProductPage'>
      <IndividualProduct id={id} name={name} price={price} description={description} image={image}/>
    </div>
  )
}

export default IndividualProductPage
