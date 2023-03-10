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

// Fetching all registered cyber services
const allcyberservices = (req, res) => { 

    Cyber.find()
        .sort({ 'createdAt': 1 })
        .then((registeredservices) => { 

            let totalservices = registeredservices.length;

            res.json({
                
                total: totalservices,
                cyberservices: registeredservices
            })

                .catch((error) => { 
                    console.log(error);
                    res.json({
                        message: 'An error occurred while fetching cyber services',
                        error: error
                    });
                })

        })
};

module.exports = {
    newcyberservice,
    allcyberservices
}