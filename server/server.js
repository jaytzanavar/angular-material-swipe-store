const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // enables obj array encoded in url
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
const key = process.env.STRIPE_KEY;
console.log(key);
const stripe = require("stripe")(key);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "CH", "GR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 550,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 10,
              },
            },
          },
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });
    res.status(200).send(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("App running on 4242"));
