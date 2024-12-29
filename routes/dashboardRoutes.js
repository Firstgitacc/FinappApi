const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const Dashboard = require('../models/Dashboard');
const { createDashboard } = require("../controllers/dashboardController");

// Define the route to fetch dashboard data
 router.get('/alldata',dashboardController.getDashboard)

// module.exports = router;
// Define the route to create a new dashboard record
//router.post('/Fn-dashboard', dashboardController.createDashboard);

router.post('/Fn-dashboard', async (req, res) => {
    console.log('POST request received:', req.body);  // Log the incoming data
    try {
        await dashboardController.createDashboard(req, res);
    } catch (error) {
        console.log("Error in POST /Fn-dashboard route:", error);  // Log error if any
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// router.post('/Fn-dashboard', async (req, res) => {
//     try {
//         const { name, amount, fromDate, toDate } = req.body;

//         const newRecord = new Dashboard({
//             name,
//             amount,
//             fromDate, 
//             toDate    
//         });

//         await newRecord.save();
//         res.status(201).json({ message: 'Record created successfully', data: newRecord });
//     } catch (error) {
//         console.error("Error saving record:", error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


module.exports = router;
