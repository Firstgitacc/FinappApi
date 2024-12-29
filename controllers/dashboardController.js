const Dashboard = require('../models/Dashboard');
const moment = require('moment');
const createDashboard = async (req, res) => {
    try {
        const { name, amount, formattedFromDate, formattedToDate  } = req.body
        console.log("Received data backend:", req.body);
        if (!name || !amount || !formattedFromDate || !formattedToDate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ message: "Amount must be a valid number" });
        }

        const fromDate = new Date(formattedFromDate);
        const toDate = new Date(formattedToDate);

        // Validate date format
        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const dashboard = new Dashboard({
            name,
            amount : parsedAmount,
            fromDate,
            toDate
        });
        await dashboard.save();
        res.status(201).json({
            ...dashboard.toObject(),
            formattedFromDate: moment(formattedFromDate).format('YYYY-MM-DD'),
            formattedToDate: moment(formattedToDate).format('YYYY-MM-DD')
        });
    } catch (error) {
        console.error("Error while creating dashboard record:", error);
        res.status(500).json({ message: 'Server error' })

    }
}
// Get all dashboard records
const getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.find()
        res.status(200).json(dashboard);

    } catch (error) {
        console.log("There is an error", error)
        res.status(500).json({ message: "server error" })

    }

}

// Edit a dashboard record
const updateDashboard = async (req, res) => {
    try {
        const { id, name, amount, formattedFromDate, formattedToDate } = req.body;
        if (!id || !name || !amount || !formattedFromDate || !formattedToDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ message: "Amount must be a valid number" });
        }

        const fromDate = new Date(formattedFromDate);
        const toDate = new Date(formattedToDate);

        // Validate date format
        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const updatedDashboard = await Dashboard.findByIdAndUpdate(id, {
            name,
            amount: parsedAmount,
            fromDate,
            toDate
        }, { new: true }); // 'new' returns the updated document

        if (!updatedDashboard) {
            return res.status(404).json({ message: "Dashboard record not found" });
        }

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