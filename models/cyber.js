const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Cyber services model
const cybermodel = new schema({
    clientsname: {
        type: String,
        require: true
    },
    servicename: {
        type: String,
        require: true
    },
    quantity: {
        type: Number
    },
    totalcost: {
        type: Number,
        require: true
    },
    payment: {
        type: String,
        require: true
    },
    transactioncode: {
        type: String
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Cyber', cybermodel,'cyber');