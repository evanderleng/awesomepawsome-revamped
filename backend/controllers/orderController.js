const Order = require("../models/Order.js");

const endpoint_url = "https://api-m.sandbox.paypal.com";

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${endpoint_url}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const createOrder = async (cart) => {
  const accessToken = await generateAccessToken();
  const url = `${endpoint_url}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "SGD",
          value: cart.total,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${endpoint_url}/v2/checkout/orders/${orderID}/capture`;

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    console.log("error");
    throw new Error(errorMessage);
  }
}
const confirmOrder = async (req, res) => {
  try {
    const userID = req.user._id;
    const { orderList } = req.body;

    console.log('Saving order for user:', userID);  // Add logging
    console.log('Order list:', orderList);  // Add logging

    const order = await Order.create({
      user_id: userID,
      order_list: JSON.parse(orderList),
    });

    console.log('Order saved:', order);  // Add logging

    return res.status(201).json({
      order_id: order._id,
      order_list: order.order_list,
      message: "Order success!",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



const getOrder = async (req, res) => {
  try {
    
    const userID = req.user._id;
    console.log('Fetching orders for user:', userID);  // Add logging

    const orders = await Order.find({ user_id: userID });
    console.log('Fetched orders:', orders);  // Add logging

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = { createOrder, captureOrder, confirmOrder, getOrder };