import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';  // Adjust the import path as needed

const Subscriptions = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data; // Assuming the response contains product details including the image URL
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const fetchConfirmedOrders = async () => {
    try {
      const response = await axiosInstance.get('/order/confirmed');
      const ordersData = response.data || [];

      const productDetailsPromises = ordersData.flatMap(order =>
        order.order_list.map(item => fetchProductDetails(item.product_id))
      );

      const productDetails = await Promise.all(productDetailsPromises);

      const productMap = productDetails.reduce((map, product) => {
        if (product) {
          map[product._id] = {
            name: product.name,
            imageURL: product.imageURL, // Assuming the product has an `imageURL` property
          };
        }
        return map;
      }, {});

      setOrders(ordersData);
      setProductMap(productMap);
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
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.order_list.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>
                      {productMap[item.product_id] ? (
                        <img
                          src={productMap[item.product_id].imageURL}
                          alt={productMap[item.product_id].name}
                          style={{ width: '50px', height: '50px' }}
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td>{productMap[item.product_id]?.name || item.product_id}</td>
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
