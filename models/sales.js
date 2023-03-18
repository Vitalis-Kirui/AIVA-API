const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Sales model
const salesmodel = new schema({
    stock: {
        type: schema.Types.ObjectId,
        ref: 'Stock'
      },
    clientsname: {
        type: String,
        require: true
    },
    productname: {
        type: String,
        require: true
    },
    quantity:{
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
});

module.exports = mongoose.model('Sales', salesmodel, 'sales');