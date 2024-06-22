// import React from 'react';

// const Subscriptions = () => {
//   return (
//     <div>
//       <h1>Subscriptions</h1>
//       <div className="subscription-item">
//         <h2>Subscription 1</h2>
//         <p>Subscription details and description...</p>
//       </div>
//       <div className="subscription-item">
//         <h2>Subscription 2</h2>
//         <p>Subscription details and description...</p>
//       </div>
//       <div className="subscription-item">
//         <h2>Subscription 3</h2>
//         <p>Subscription details and description...</p>
//       </div>
//     </div>
//   );
// };

// export default Subscriptions;

import React from 'react';

const Subscriptions = ({ subscriptions, setSubscriptions }) => {
  const handleInputChange = (index, event) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions[index] = event.target.value;
    setSubscriptions(newSubscriptions);
  };

  return (
    <div>
      <h2>Subscriptions</h2>
      {subscriptions.map((subscription, index) => (
        <div key={index}>
          <input
            type="text"
            value={subscription}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Enter subscription"
          />
        </div>
      ))}
      <button onClick={() => setSubscriptions([...subscriptions, ''])}>Add Subscription</button>
    </div>
  );
};

export default Subscriptions;
