import React, { useState } from 'react'
import './Profile.css'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Subscriptions from './Subscriptions'
import PetDetails from './PetDetails'
import PersonalDetails from './PersonalDetails';


const Profile = () => {


    const [selectedTab, setSelectedTab] = useState('subscriptions');

    const renderContent = () => {
      switch (selectedTab) {
        case 'subscriptions':
          return <Subscriptions />;
        case 'petDetails':
          return <PetDetails />;
        case 'personalDetails':
          return <PersonalDetails />;
        default:
          return <Subscriptions />;
      }
    };

    return (
      <div className="profile">
        <Header/>
        <Sidebar onSelectTab={setSelectedTab} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    );
    };

 

export default Profile