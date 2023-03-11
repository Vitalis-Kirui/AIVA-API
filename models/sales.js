const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Sales model
const salesmodel = new schema({
    clientsname: {
        type: String,
        require: true
    },
    productname: {
        type: String,
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
});

module.exports = mongoose.model('Sales', salesmodel, 'sales');