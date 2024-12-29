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
        
    },

});
module.exports = mongoose.model('Account',accountSchema)