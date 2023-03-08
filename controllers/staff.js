const Staff = require('../models/staff');

// Adding new staff
const newstaff = (req, res) => {

    const formdata = req.body;

    Staff.find({ nationalid: formdata.nationalid }, (error, staff) => { 

        if (error) {
            console.log(error);

            res.json({
                message: 'An error occurred',
                error : error
            })
        }
        if (staff) {
            
            res.json({
                message: 'Staff with the same national id is already registered'
            })
        }

        else {

            let newstaff = new Staff(formdata);

            // Saving staff
            newstaff.save()
                .then(success => {
                    res.json({
                        message: 'Staff is successfully registered',
                    });
                })
                .catch(error => { 

                    res.json({
                        message: 'There was an error saving staff',
                        error : error
                    });

                })
            
        }
        

    })
    
}

module.exports = {
    newstaff
}