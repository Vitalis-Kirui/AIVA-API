const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Expenses model
const expensesmodel = new schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    totalcost: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Expenses', expensesmodel, 'expenses');