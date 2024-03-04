import React from "react";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { placeOrder } from "../action/orderAction";
import StripeCheckout from "react-stripe-checkout";

const stripePromise = loadStripe(
  "pk_test_51Oc7pYSIp5fVHE7p0cgMHkWjCcE63zTx7E8NfrGzcFy6jS7eneORRQ2tXLM0AYUGnUImHHMWQ8EMYDJcSL5nZN4M00prVxMNz2"
);

export default function Checkout({ subtotal }) {
  const dispatch = useDispatch();

  const tokenHandler = async (token) => {
    try {
      const response = await fetch("/api/orders/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          subtotal,
          // Add any other required parameters
        }),
      });

      const data = await response.json();

      const stripe = await stripePromise;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        data.clientSecret, // PaymentIntent client secret
        {
          payment_method: {
            card: stripe.elements.getElement("card"),
            billing_details: {
              email: token.email,
            },
          },
        }
      );

      if (error) {
        console.error("Error confirming payment:", error);
        // Handle error
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded");
        dispatch(placeOrder(token, subtotal));
      }
    } catch (error) {
      console.error("Error during token handling:", error);
      // Handle error
    }
  };

  return (
    <Elements stripe={stripePromise}>
           <StripeCheckout
        amount={subtotal * 100}
        billingAddress
        token={tokenHandler}
        stripeKey={
          "pk_test_51Oc7pYSIp5fVHE7p0cgMHkWjCcE63zTx7E8NfrGzcFy6jS7eneORRQ2tXLM0AYUGnUImHHMWQ8EMYDJcSL5nZN4M00prVxMNz2"
        }
        currency="INR"
       
      >
        <button tokenHandler={tokenHandler} subtotal={subtotal} className="btn">Pay Now</button>
      </StripeCheckout>
    </Elements>
  );
}
