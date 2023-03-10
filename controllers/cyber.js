const Cyber = require('../models/cyber');

// Saving new cyber service
const newcyberservice = (req, res) => { 

    let servicedata = req.body;

    Cyber.save(servicedata)
        .then((success) => {
            res.json({
                message: 'Cyber service registered successfully'
            })
        })
        .catch((error) => { 
            console.log(error)
            res.json({
                message: 'There was an error registering the cyber service'
            })
        });

};

module.exports = {
    newcyberservice
}