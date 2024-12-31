const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    dcc:{
        type: String,
        required: true
    },
    vcj:{
        type: String,
        required: true
    },
    dvs:{
        type: String,
        required: true

    },
    sc:{
        type: String,
        required: false
        
    },finalAmount: {  // Add finalAmount to store the accumulated amount
        type: Number,
        default: 808362  // Default base amount
    }

});
module.exports = mongoose.model('Account',accountSchema)