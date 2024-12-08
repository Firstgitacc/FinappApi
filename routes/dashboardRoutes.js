const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const Dashboard = require('../models/Dashboard');
const { createDashboard } = require("../controllers/dashboardController");

// router.post('/Fn-dashboard',dashboardController.createDashboard);
// //router.post('/Fn-dashboard',createDashboard.createDashboard);
 router.get('/alldata',dashboardController.getDashboard)

// module.exports = router;
router.post('/Fn-dashboard', async (req, res) => {
    try {
        const { name, amount, fromDate, toDate } = req.body;

        const newRecord = new Dashboard({
            name,
            amount,
            fromDate, // Ensure this matches the schema
            toDate    // Ensure this matches the schema
        });

        await newRecord.save();
        res.status(201).json({ message: 'Record created successfully', data: newRecord });
    } catch (error) {
        console.error("Error saving record:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
