const express = require("express");
const cors = require("cors");
require('dotenv').config()

const stripe = require("stripe")(process.env.STRIPE_KEY)
///APP CONFIG
const app = express();


//MIDDLEWARES
app.use(cors({ origin: true}))
app.use(express.json());

//API ROUTES
app.get('/', (req, res) => {
    res.status(200).send('HELLO')
});

app.post('/payment/create', async (req, res) => {
    const total = req.query.total
    console.log('Payment request recieved', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency:'inr',
    });
    console.log(paymentIntent)
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
    console.log('Server Started')
})