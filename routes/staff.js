const express = require('express');
const router = express.Router();
const staffcontrollers = require('../controllers/staff');

// New staff route
router.post('/new-staff', staffcontrollers.newstaff);

// All staffs route
router.get('/all-staffs', staffcontrollers.allstaffs);

// CEOS route
router.get('/ceos', staffcontrollers.fetchingceos);

// Management route
router.get('/management', staffcontrollers.fetchingmanagement);

// Supervisors route   
router.get('/supervisors', staffcontrollers.fetchingsupervisors);

// Attendants route
router.get('/attendants', staffcontrollers.fetchingattendants);

// Fetching single staff details
router.get('/staff/:id', staffcontrollers.fetchingsinglestaff);

// Deleting a single staff
router.delete('/staff/:id', staffcontrollers.deletestaff);

// Updating staff data
router.put('/staff/:id', staffcontrollers.updatestaff);

// Start session
router.get('/start-session', staffcontrollers.startsession);

module.exports = router;