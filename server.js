// server.js

const express = require('express');
const Pizza = require('./Models/pizzaModel');
const connectToDatabase = require('./db'); // Adjust the path accordingly

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
connectToDatabase();

const pizzasRoute = require('./routes/pizzaRoutes')
const userRoute = require('./routes/userRoute')
const orderRouter = require('./routes/ordersRoute')



app.use('/api/pizzas/', pizzasRoute)
app.use('/api/users/',userRoute)
app.use('/api/orders/' , orderRouter)
app.get("/", (req, res) => {
    res.send('Hello, this is your Node.js server!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
