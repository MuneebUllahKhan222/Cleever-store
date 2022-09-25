const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51Lj1VASGZP3p3zAF1bWp5RFnID7qsSAN5UG2gVvYvvxNJc8E4WUnycQlszjMCnv3JegKYNWTLJ6aZ8rJX2lYfX3d00JIv0Ji9W");

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
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


app.listen('7000', () => {
    console.log('Server Started')
})