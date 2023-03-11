const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

// Routes
const stockroutes = require('./routes/add-stock');
const cyberroutes = require('./routes/cyber');
const expensesroutes = require('./routes/expenses');
const salesroutes = require('./routes/sales');
const staffroutes = require('./routes/staff');

// Local files
const config = require('./config/config-variables');


// Declaring app
const app = express();

// Using cors
app.use(cors());

// Using body parser
app.use(bodyparser.json());

// Connecting to database
mongoose.connect(config.dbconnection)
    .then(success => {
            
        // Listening to request
        app.listen(3000)
        console.log('listening to request on port 3000');
    })
    .catch(error => {
            console.log('Error connecting to database')
    })
        
// Listening to request 
app.get('', (req, res) => { 
    res.send('Hello from Server');
})

// Using routes
// staff routes
app.use('/staffs', staffroutes);

// stock routes
app.use('/stock', stockroutes);

// Cyber routes
app.use('/cyber', cyberroutes);

// expenses routes
app.use('/expenses', expensesroutes);

//sales routes
app.use('/sales', salesroutes);