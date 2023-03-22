const express = require('express');
const router = express.Router();
const cybercontrollers = require('../controllers/cyber');

// New cyber service route
router.post('/new-cyber-service', cybercontrollers.newcyberservice);

// All cyber services route
router.get('/all-cyber-services', cybercontrollers.allcyberservices);

// Today's cyber service route
router.get('/today-cyber-services', cybercontrollers.todaycyberservices);

// Get by date
router.get('/by-date', cybercontrollers.getservicesbydate)

module.exports = router;