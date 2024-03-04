const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Oc7pYSIp5fVHE7phwn5qiYYLFc2twhTkdU01FBBEiJndQwWS5jzS2D2ger5oxFpcliUAC584jmmIi6eIFwwZ7eL00xFux4pT3"
);

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;
//console.log(token, subtotal, currentUser, cartItems );
  // Ensure subtotal is a valid number
  if (isNaN(subtotal) || subtotal <= 0) {
    return res.status(400).json({ message: "Invalid subtotal value" });
  }
  try {
    // Check if the customer exists, if not, create a new customer
    let customer = await stripe.customers.list({
      email: token.email,
      limit: 1,
    });

    if (customer.data.length === 0) {
      const createdCustomer = await stripe.customers.create({
        email: token.email,
      });
      customer = createdCustomer;
    } else {
      customer = customer.data[0];
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(subtotal * 100), // Ensure it's a valid integer
      currency: "inr",
      customer: customer.id,
      payment_method_data: {
        type: "card",
        card: {
          token: token.id,
        },
      },
      receipt_email: token.email,
      confirm: true,
      return_url: "http://localhost:3000/",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
    // Confirm the PaymentIntent to finalize the payment
    await stripe.paymentIntents.confirm(paymentIntent.id); 

    res.json({ clientSecret: paymentIntent.client_secret, message: "Payment Done" });
  } catch (error) {
    console.error("Error creating/payment confirmation:", error);
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

module.exports = router;
