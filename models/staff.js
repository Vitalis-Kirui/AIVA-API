const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Staff model
const staffmodel = new schema({
    firstname: {
        type: String,
        require: true
    },
    secondname: {
        type: String,
        require: true
    },
    nationalid: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    workstation: {
        type: String,
        require: true
    },
    monthlysalary: {
        type: Number,
        require: true
    }

})

module.exports = mongoose.model('Staff', staffmodel, 'staffs');