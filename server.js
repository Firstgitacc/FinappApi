const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dashboardroutes = require('./routes/dashboardRoutes');
const accountRoutes = require('./routes/accountRoutes');
const cors = require('cors');

const app = express();

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/dashboard', dashboardroutes);
app.use('/account', accountRoutes);

// Connect to MongoDB (Updated)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}`);
});
