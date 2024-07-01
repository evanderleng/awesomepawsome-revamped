import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosConfig';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './Subscriptions.css';

const Subscriptions = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [reviewedProducts, setReviewedProducts] = useState({});

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
            imageURL: product.imageURL,
          };
        }
        return map;
      }, {});

      setOrders(ordersData);
      setProductMap(productMap);

      // Check which products have been reviewed
      const reviewedProductsMap = {};
      for (const order of ordersData) {
        for (const item of order.order_list) {
          const hasReview = await checkProductReview(order._id, item.product_id);
          reviewedProductsMap[`${order._id}-${item.product_id}`] = hasReview;
        }
      }
      setReviewedProducts(reviewedProductsMap); // Update reviewedProducts state
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const checkProductReview = async (orderId, productId) => {
    try {
      const response = await axiosInstance.get(`/review/checkReview/${orderId}/${productId}`);
      return response.data.hasReview;
    } catch (error) {
      console.error('Error checking review status:', error);
      return false;
    }
  };

  const handleSubmitReview = async (productId, orderId, reviewData) => {
    try {
      const response = await axiosInstance.post('/review/addReview', {
        product_id: productId,
        order_id: orderId,
        ...reviewData
      });
      console.log('Review submitted successfully:', response.data);
  
      // Update reviewedProducts state
      setReviewedProducts(prev => ({
        ...prev,
        [`${orderId}-${productId}`]: true
      }));
  
      // Force a re-fetch of orders to ensure all data is up to date
      fetchConfirmedOrders();
    } catch (error) {
      console.error('Error submitting review:', error.response?.data || error.message);
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
                    {!reviewedProducts[reviewKey] ? (
                      <ReviewForm
                        productId={item.product_id}
                        orderId={order._id}
                        onSubmit={(reviewData) => handleSubmitReview(item.product_id, order._id, reviewData)}
                      />
                    ) : (
                      <p className="review-submitted">Thank you for your review!</p>
                    )}
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
