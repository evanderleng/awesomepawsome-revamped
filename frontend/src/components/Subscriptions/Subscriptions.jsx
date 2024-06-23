import React from 'react';

const Subscriptions = ({ subscriptions }) => {
  return (
    <div className="subscriptions">
      <div className="title-container">
        <h2>Subscriptions</h2>
      </div>
      {subscriptions.length > 0 ? (
        <table className="subscription-table">
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Started on</th>
              <th>Recurring</th>
              <th>Next Billing</th>
              <th>End on</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <tr key={index}>
                <td>{subscription.name}</td>
                <td>{subscription.startDate || '-'}</td>
                <td>{subscription.recurring || '-'}</td>
                <td>{subscription.nextBilling || '-'}</td>
                <td>{subscription.endDate || '-'}</td>
                <td className={`status ${subscription.status.toLowerCase()}`}>{subscription.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-subscription">No current subscription</p>
      )}
    </div>
  );
};

export default Subscriptions;
