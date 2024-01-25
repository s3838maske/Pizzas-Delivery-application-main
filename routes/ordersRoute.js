const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Oc7pYSIp5fVHE7phwn5qiYYLFc2twhTkdU01FBBEiJndQwWS5jzS2D2ger5oxFpcliUAC584jmmIi6eIFwwZ7eL00xFux4pT3"
);

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    )
  if (payment) {
    res.send('Payment Done')
  }
  else {
    res.send('Payment Failed')
  }
  } catch (error) {
    return res.status(400).json({ message: 'something went wrong' + error})
  }
});

module.exports = router;
