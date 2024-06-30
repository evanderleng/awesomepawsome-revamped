// import React from 'react';

// function CartSummary({ subtotal, deliveryCharge, grandTotal }) {
//   return (
//     <div className='cart-summary'>
//       <div>Subtotal: ${subtotal.toFixed(2)}</div>
//       <div>Delivery Charge: ${deliveryCharge.toFixed(2)}</div>
//       <div>Grand Total: ${grandTotal.toFixed(2)}</div>
//     </div>
//   );
// }

// export default CartSummary;

import React from "react";
import "./CartSummary.css"; // Ensure the CSS file is linked

function CartSummary({ subtotal, deliveryCharge, grandTotal }) {
  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Estimated Delivery</span>
        <span>${deliveryCharge.toFixed(2)}</span>
      </div>
      <hr />
      <div className="summary-row total">
        <span>Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartSummary;
