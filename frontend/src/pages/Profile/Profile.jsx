import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/SideBar/Sidebar';
import Subscriptions from '../../components/Subscriptions/Subscriptions';
import PersonalDetails from '../../components/PersonalDetails/Personaldetails';
import PetDetails from '../../components/PetDetails/PetDetails';
import './Profile.css';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('subscriptions');
  const [subscriptions, setSubscriptions] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({ name: '', email: '' });
  const [petDetails, setPetDetails] = useState({ petName: '', petType: '' });

  const renderContent = () => {
    switch (selectedTab) {
      case 'subscriptions':
        return <Subscriptions subscriptions={subscriptions} setSubscriptions={setSubscriptions} />;
      case 'petDetails':
        return <PetDetails petDetails={petDetails} setPetDetails={setPetDetails} />;
      case 'personalDetails':
        return <PersonalDetails personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />;
      default:
        return <Subscriptions subscriptions={subscriptions} setSubscriptions={setSubscriptions} />;
    }
  };

  return (
    <div>
      <Header className="header" />
      <div className="profile">
        <Sidebar className="sidebar" onSelectTab={setSelectedTab} selectedTab={selectedTab} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
