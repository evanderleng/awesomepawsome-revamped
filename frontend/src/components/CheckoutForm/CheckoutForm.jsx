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
// const stripePromise = loadStripe(import.meta.env.STRIPE_SECRET);
const stripePromise = loadStripe("pk_test_51PaLw5DC0HCHwtvpiczlynmAWelkBibgTMosTYYk32a7EbMPWLs75Jaf1GmD5RihL77pFtrcshi0DaaNc585i80R00nWCYRAra")

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


export default CheckoutForm;