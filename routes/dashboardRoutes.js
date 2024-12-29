const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const Dashboard = require('../models/Dashboard');
const { createDashboard,updateDashboard } = require("../controllers/dashboardController");

// Define the route to fetch dashboard data
// Route to get all records
 router.get('/alldata',dashboardController.getDashboard)

// module.exports = router;
// Define the route to create a new dashboard record
//router.post('/Fn-dashboard', dashboardController.createDashboard);
// Route to create a new record
router.post('/Fn-dashboard', async (req, res) => {
    console.log('POST request received:', req.body);  // Log the incoming data
    try {
        await dashboardController.createDashboard(req, res);
    } catch (error) {
        console.log("Error in POST /Fn-dashboard route:", error);  // Log error if any
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to update an existing record
router.put('/Fn-dashboard/:id', updateDashboard);

module.exports = router;
