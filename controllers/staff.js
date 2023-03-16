const Staff = require('../models/staff');

// Adding new staff
const newstaff = async (req, res) => {
  try {
    const staffdata = req.body;

    const existingstaff = await Staff.findOne({
      nationalid: staffdata.nationalid,
    });
    if (existingstaff) {
      return res.status(409).json({
        success: false,
        message: `Staff with id number ${staffdata.nationalid} already exists`,
      });
    }

    const newstaff = new Staff(staffdata);

    await newstaff.save();

    res.status(201).json({
      success: true,
      message: "Staff saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving staff",
      error: error.message,
    });
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

// Fetching a single staff
const fetchingsinglestaff = (req, res) => {
    
    const id = req.params.id;

    Staff.findById(id, (error, success) => {
        if (error) {
            res.json({
                success: false,
                message:"There was an error fetching staff details"
            })
        }
        else {
            res.json({
                success: true,
                staffdata: success
            })
        }
    })
}

module.exports = {
    newstaff,
    allstaffs,
    fetchingceos,
    fetchingmanagement,
    fetchingsupervisors,
    fetchingattendants,
    fetchingsinglestaff
}