import React, { useEffect } from 'react'
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

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top-left corner of the page
  }, []); // Empty dependency array ensures this effect runs only on component mount


  return (
    <div className='individualProductPage'>
      <IndividualProduct id={id} name={name} price={price} description={description} image={image}/>
    </div>
  )
}

export default IndividualProductPage
