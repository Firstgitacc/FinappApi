const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        default: Date.now    }
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
