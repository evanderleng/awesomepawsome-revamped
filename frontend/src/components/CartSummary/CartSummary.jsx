import React from 'react';

function CartSummary({ subtotal, deliveryCharge, grandTotal }) {
  return (
    <div className='cart-summary'>
      <div>Subtotal: ${subtotal.toFixed(2)}</div>
      <div>Delivery Charge: ${deliveryCharge.toFixed(2)}</div>
      <div>Grand Total: ${grandTotal.toFixed(2)}</div>
    </div>
  );
}

export default CartSummary;
