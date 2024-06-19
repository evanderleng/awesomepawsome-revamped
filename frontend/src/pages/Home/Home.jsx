// Home.js
import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import HomePageSteps from '../../components/HomePageSteps/HomePageSteps';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <main>
        <section id='steps' className='steps'>
          <HomePageSteps 
            stepNumber={1} 
            imageLink="https://via.placeholder.com/150" 
            title="Fill Up Your Pet Data" 
            description="Tell us more about your pet such as their breed, age, weight, and more so that we can recommend the best options!"
          />
          <HomePageSteps 
            stepNumber={2} 
            imageLink="https://via.placeholder.com/150" 
            title="Select A Plan" 
            description="Choose the perfect plan that fits your pet's diet and your budget."
          />
          <HomePageSteps 
            stepNumber={3} 
            imageLink="https://via.placeholder.com/150" 
            title="Make Payment" 
            description="Securely complete your purchase and get ready for your pet's new diet."
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
