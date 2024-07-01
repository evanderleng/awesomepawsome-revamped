
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';  // Adjust the import path as needed

const Subscriptions = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    confirmedOrders();
  }, []);

  const confirmedOrders = async () => {
    try {
      const response = await axiosInstance.get('/order/confirmed');
      console.log('Fetched orders data:', response.data);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="subscriptions">
      <div className="title-container">
        <h2>Order History</h2>
      </div>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order ID: {order._id}</h3>
            <table className="subscription-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.order_list.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.product_id}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="no-subscription">No order history</p>
      )}
    </div> 
  );
};

export default Subscriptions;