import React, { useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import "./Cart.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import CartEmpty from '../../components/CartEmpty/CartEmpty';

const initialOptions = {
  "client-id":
    "AYizNfu94uieg5xAIH6fYRDLw23aVEOaIs53oazYt93CUb5QKes36pTavNtMpCm2QpHHl74FpXx2bnJB",
  currency: "SGD",
  "enable-funding": "paylater,venmo,card",
  "disable-funding": "",
  "data-sdk-integration-source": "integrationbuilder_sc",
};

const Cart = () => {
  async function createOrder() {
    try {
      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: {
            total: grandTotal,
          },
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onApprove(data, actions) {
    try {
      const response = await fetch(`/api/order/${data.orderID}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Confirm order and create entry in DB
        const transaction = orderData.purchase_units[0].payments.captures[0];
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [items, setItems] = useState([
    { id: 1, title: "Item 1", price: 10.0, quantity: 2, selected: true },
    { id: 2, title: "Item 2", price: 20.0, quantity: 1, selected: false },
    { id: 3, title: "Item 3", price: 20.0, quantity: 1, selected: false },
    { id: 4, title: "Item 4", price: 20.0, quantity: 1, selected: false },
  ]);

  const toggleSelection = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (acc, item) => (item.selected ? acc + item.quantity * item.price : acc),
    0,
  );
  const deliveryCharge = 15.0;
  const grandTotal = subtotal + deliveryCharge;

  // if (items.length === 0) {
  //   // Return the CartEmpty component if there are no items
  //   return <CartEmpty/>

  // }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              toggleSelection={() => toggleSelection(item.id)}
              removeItem={() => removeItem(item.id)}
            />
          ))}
        </div>
        <div className="checkout">
          <CartSummary
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            grandTotal={grandTotal}
          />
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              style={{ layout: "vertical" }}
              disabled={subtotal <= 0} // Disable the button when subtotal is 0
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Cart;
