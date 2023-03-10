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

// Fetching all the staffs
const allstaffs = (req, res) => {

    Staff.find()
        .sort({ 'firstname': 1 })
        .then((error, staffs) => {
            if (error) {
                res.json({
                    message: 'An error occurred while fetching staffs',
                    error : error
                });
            }
            if (staffs) {

                let total = staffs.length;
                res.json({
                    number: total,
                    staffs : staffs
                });
            }
            })
    
}

// Fetching staffs with CEO rank | role
const fetchingceos = (req, res) => { 

    Staff.find({ role: 'CEO' })
        .sort({ 'firstname': 1 })
        .then((ceostaffs) => {

            res.json({ok : true, CEOs : costaffs})
            
        })
        .catch((error) => {
            res.json({ ok: false, message: "There was an error fetching data" })
            console.log(error)
    })

};

// Fetching management staffs
const fetchingmanagement = (req, res) => { 

    Staff.find({ role: 'management' })
        .sort({ 'firstname': 1 })
        .then((managementstaffs) => {

            res.json({ok : true, management : managementstaffs})
            
        })
        .catch((error) => {
            res.json({ ok: false, message: "There was an error fetching data" })
            console.log(error)
    })

};

// Fetching supervisor staffs
const fetchingsupervisors = (req, res) => { 

    Staff.find({ role: 'supervisor' })
        .sort({ 'firstname': 1 })
        .then((supervisors) => {

            res.json({ok : true, supervisors : supervisors})
            
        })
        .catch((error) => {
            res.json({ ok: false, message: "There was an error fetching data" })
            console.log(error)
    })

};

// Fetching attendants
const fetchingattendants = (req, res) => { 

    Staff.find({ role: 'attendant' })
        .sort({ 'firstname': 1 })
        .then((attendants) => {

            res.json({ok : true, attendants : attendants})
            
        })
        .catch((error) => {
            res.json({ ok: false, message: "There was an error fetching data" })
            console.log(error)
    })

};

module.exports = {
    newstaff,
    allstaffs,
    fetchingceos,
    fetchingmanagement,
    fetchingsupervisors,
    fetchingattendants
}