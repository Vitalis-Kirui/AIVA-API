const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Stock model
const stockmodel = new schema({
    productname: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    buyingprice: {
        type: Number,
        require: true
    },
    sellingprice: {
        type: Number,
        require: true
    }
},
    {
        timestamps: true
    }
);

module.exports =mongoose.model('Stocks', stockmodel,'stocks');