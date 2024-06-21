// import React, { useState } from 'react'
// import Header from '../../components/Header/Header'
// import Sidebar from '../../components/SideBar/Sidebar'
// import Subscriptions from '../../components/Subscriptions/Subscriptions'
// import PersonalDetails from '../../components/PersonalDetails/Personaldetails'
// import PetDetails from '../../components/PetDetails/PetDetails'
// import './Profile.css'

// const Profile = () => {


//     const [selectedTab, setSelectedTab] = useState('subscriptions');

//     const renderContent = () => {
//       switch (selectedTab) {
//         case 'subscriptions':
//           return <Subscriptions />;
//         case 'petDetails':
//           return <PetDetails />;
//         case 'personalDetails':
//           return <PersonalDetails />;
//         default:
//           return <Subscriptions />;
//       }
//     };

//     return (
//       <div>
//         <Header />
//         <div className="profile">
//           <Sidebar onSelectTab={setSelectedTab} />
//           <div className="content">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
 

// export default Profile

import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/SideBar/Sidebar';
import Subscriptions from '../../components/Subscriptions/Subscriptions';
import PersonalDetails from '../../components/PersonalDetails/Personaldetails'
import PetDetails from '../../components/PetDetails/PetDetails';
import './Profile.css';

const Profile = () => {
  // State for each tab
  const [selectedTab, setSelectedTab] = useState('subscriptions');
  const [subscriptions, setSubscriptions] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({ name: '', email: '' });
  const [petDetails, setPetDetails] = useState({ petName: '', petType: '' });

  // Function to render content based on the selected tab
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

export default Profile;
