const Dashboard = require('../models/Dashboard');
const moment = require('moment');

// Create a new dashboard record
const createDashboard = async (req, res) => {
    try {
        const { name, amount, formattedFromDate, formattedToDate } = req.body;
        console.log("Received data backend:", req.body);

        // Validate required fields
        if (!name || !amount || !formattedFromDate || !formattedToDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Parse and validate the amount
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ message: "Amount must be a valid number" });
        }

        // Parse and validate the dates
        const fromDate = new Date(formattedFromDate);
        const toDate = new Date(formattedToDate);
        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Create the new dashboard record
        const dashboard = new Dashboard({
            name,
            amount: parsedAmount,
            fromDate,
            toDate
        });

        // Save the dashboard record
        await dashboard.save();
        res.status(201).json({
            ...dashboard.toObject(),
            formattedFromDate: moment(formattedFromDate).format('YYYY-MM-DD'),
            formattedToDate: moment(formattedToDate).format('YYYY-MM-DD')
        });
    } catch (error) {
        console.error("Error while creating dashboard record:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all dashboard records
const getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.find();
        res.status(200).json(dashboard);
    } catch (error) {
        console.log("There is an error", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Edit an existing dashboard record
const updateDashboard = async (req, res) => {
    try {
        const { id, name, amount, formattedFromDate, formattedToDate,additionalRows  } = req.body;

        // Validate required fields
        if (!id || !name || !amount || !formattedFromDate || !formattedToDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Parse and validate the amount
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ message: "Amount must be a valid number" });
        }

        // Parse and validate the dates
        const fromDate = new Date(formattedFromDate);
        const toDate = new Date(formattedToDate);
        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Find the existing dashboard record by ID
        const dashboard = await Dashboard.findById(id);
        if (!dashboard) {
            return res.status(404).json({ message: "Dashboard record not found" });
        }

        // Update the record with the new data
        dashboard.name = name;
        dashboard.amount = parsedAmount;
        dashboard.fromDate = fromDate;
        dashboard.toDate = toDate;
        dashboard.additionalRows = additionalRowsadditionalRows || [];
        // Save the updated record
        const updatedDashboard = await dashboard.save();

        // Send the updated record as response
        res.status(200).json({
            ...updatedDashboard.toObject(),
            formattedFromDate: moment(fromDate).format('YYYY-MM-DD'),
            formattedToDate: moment(toDate).format('YYYY-MM-DD')
        });

    } catch (error) {
        console.error("Error while updating dashboard record:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createDashboard, getDashboard, updateDashboard };
