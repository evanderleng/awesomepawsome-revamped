import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../../axiosConfig'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51PaLw5DC0HCHwtvpkqL3kqfqbjawIg3ZFGby0Q7lzhbqRO5lzCVlx8qHBAYYXpheDZC1gEZMOvbQm6AN1m75OK0k004NujNdQV");


const CheckoutForm = (order) => {

    const navigate = useNavigate();

    const fetchClientSecret = useCallback( async () => {
        // Create a Checkout Session
        return axiosInstance.post("/api/order2/create-checkout-session", order)
            .then((res) => res.data.clientSecret);
            // .then((data) => data.clientSecret);
    }, []);

    const options = { fetchClientSecret };
    console.log(options)

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'open') {
        navigate('/');
    }

    if (status === 'complete') {
        alert("Payment success!")
    }

    return null;
}


export default CheckoutForm;