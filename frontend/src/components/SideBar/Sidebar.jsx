import React from 'react';

const Sidebar = ({ onSelectTab }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelectTab('subscriptions')}>Subscriptions</li>
        <li onClick={() => onSelectTab('petDetails')}>Pet Details</li>
        <li onClick={() => onSelectTab('personalDetails')}>Personal Details</li>
      </ul>
    </div>
  );
};

export default Sidebar;
