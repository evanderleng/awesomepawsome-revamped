import React, { useEffect } from 'react'
import './IndividualProductPage.css'
import IndividualProduct from '../../components/IndividualProduct/IndividualProduct'
import { useLocation, useParams } from 'react-router-dom'
import CustomerReview from '../../components/CustomerReview/CustomerReview'

const IndividualProductPage = () => {

  const location = useLocation();
  const { id, brand, name, weight, price, rating, ratingCount, description, ingredients, breedSize } = location.state || {}; // Destructure name and price from location.state
  
  // debugging purpose
  console.log('id brought over: ', id);
  console.log('name brought over: ', name);
  console.log('price brought over: ', price);
  console.log('description brought over: ', description);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top-left corner of the page
  }, []); // Empty dependency array ensures this effect runs only on component mount


  // TODO: need to add image from DB
  return (
    <div className='individualProductPage'>
      <IndividualProduct id={id} brand={brand} name={name} weight={weight} price={price} rating={rating} ratingCount={ratingCount} description={description} ingredients={ingredients} breedSize={breedSize}/>
      <CustomerReview product_id={'665b60e31271676dae7eb111'}/>
    </div>
  )
}

export default IndividualProductPage
