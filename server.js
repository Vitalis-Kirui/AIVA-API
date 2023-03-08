const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

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