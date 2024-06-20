import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/SideBar/Sidebar'
import Subscriptions from '../../components/Subscriptions/Subscriptions'
import PersonalDetails from '../../components/PersonalDetails/Personaldetails'
import PetDetails from '../../components/PetDetails/PetDetails'
import './Profile.css'

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
      <div>
        <Header />
        <div className="profile">
          <Sidebar onSelectTab={setSelectedTab} />
          <div className="content">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };
  
 

export default Profile