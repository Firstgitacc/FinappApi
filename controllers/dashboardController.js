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
const getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.find()
        res.status(200).json(dashboard);

    } catch (error) {
        console.log("There is an error", error)
        res.status(500).json({ message: "server error" })

    }

}
module.exports = { createDashboard, getDashboard }