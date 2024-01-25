import React from "react";
import {useDispatch} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from "../action/orderAction";



export default function Checkout({ subtotal }) {

    const dispatch = useDispatch()
    function tokenHander(token)
    {
        console.log(token);
        dispatch(placeOrder(token, subtotal))
    }


  return (
    <div>
      <StripeCheckout 
      amount={subtotal*100}
      billingAddress
      token={tokenHander}
      stripeKey={'pk_test_51Oc7pYSIp5fVHE7p0cgMHkWjCcE63zTx7E8NfrGzcFy6jS7eneORRQ2tXLM0AYUGnUImHHMWQ8EMYDJcSL5nZN4M00prVxMNz2'}
      currency="INR"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
