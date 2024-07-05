import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './Subscriptions.css';

const Subscriptions = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const fetchConfirmedOrders = async () => {
    try {
      const response = await axiosInstance.get('/order/getOrder');
      const ordersData = response.data || [];

      const productDetailsPromises = ordersData.flatMap(order =>
        order.order_list.map(item => fetchProductDetails(item.product_id))
      );

      const productDetails = await Promise.all(productDetailsPromises);

      const productMap = productDetails.reduce((map, product) => {
        if (product) {
          map[product._id] = {
            name: product.name,
            imageURL: product.imageURL,
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
      <h2 className="title">Order History</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3 className="order-id">Order ID: {order._id}</h3>
            <div className="order-details">
              {order.order_list.map((item, index) => {
const reviewKey = `${order._id}-${item.product_id}`;                return (
                  <div key={reviewKey} className="product-item">
                    <img
                      src={productMap[item.product_id]?.imageURL || 'placeholder-image-url'}
                      alt={productMap[item.product_id]?.name || 'Product'}
                      className="product-image"
                    />
                    <div className="product-info">
                      <p className="product-name">{productMap[item.product_id]?.name || item.product_id}</p>
                      <p className="product-quantity">Quantity: {item.quantity}</p>
                    </div>
                      <ReviewForm
                        productId={item.product_id}
                      />
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="no-subscription">No order history</p>
      )}
    </div>
  );
};

export default Subscriptions;
