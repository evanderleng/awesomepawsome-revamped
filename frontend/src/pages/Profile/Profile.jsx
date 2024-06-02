import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/SideBar/Sidebar'
import Subscriptions from '../../components/Subscriptions/Subscriptions'
import PetDetails from '../../components/PetDetails/PetDetails'
import PersonalDetails from '../../components/PersonalDetails/Personaldetails'


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