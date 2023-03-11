const Staff = require('../models/staff');

// Adding new staff
const newstaff = async (req, res) => { 
    try {

        const newstaffdetails = req.body;

        const existingstaff = await Staff.findOne({ nationalid: newstaffdetails.nationalid });
        
        if (existingstaff) {

            res.json({
                success: false,
                message: `A staff with the ${newstaffdetails.nationalid} already registered`
            })
            
        };

        const newstaff = new Staff(newstaffdetails);

        await newstaff.save();

        res.json({
            success: true,
            message:"New staff successfully registered"
        })
        
    }
    catch (error) {

        res.json({
            success: false,
            message: "Error occurred while saving staff details",
            error: error.message
        })
        
    }
};

// Fetching all the staffs
const allstaffs = (req, res) => {

    Staff.find()
        .sort({ 'firstname': 1 })
        .then((staffs) => {

            const totalstaffs = staffs.length;

            res.json({
                success: true,
                total: totalstaffs,
                staffs: staffs
            })
            
        })
        .catch((error) => {
            res.json({
                success: false,
                message: "There was an error fetching staffs details.",
                error: error.message
        })
    })
    
}

// Fetching staffs with CEO rank | role
const fetchingceos = (req, res) => { 

    Staff.find({ role: 'CEO' })
        .sort({ 'firstname': 1 })
        .then((ceostaffs) => {

            res.json({ok : true, CEOs : ceostaffs})
            
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