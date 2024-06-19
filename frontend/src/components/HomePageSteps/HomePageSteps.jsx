// HomePageSteps.js
import React from 'react';
import './HomePageSteps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faClipboardList, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  1: faPaw,
  2: faClipboardList,
  3: faCreditCard
};

const HomePageSteps = ({ stepNumber = 1, title = "Title", description = "Description" }) => {
  return (
    <div className='step'>
      <div className='icon'>
        <FontAwesomeIcon icon={iconMap[stepNumber] || faPaw} />
      </div>
      <div className='step-number'>Step {stepNumber}</div>
      <h3>{title}</h3>
      <p className='step-description'>{description}</p>
    </div>
  );
};

export default HomePageSteps;
