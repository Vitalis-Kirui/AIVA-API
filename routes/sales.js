const express = require('express');
const router = express.Router();
const salescontrollers = require('../controllers/sales');

// new sale route
router.post('/new-sale', salescontrollers.newsale);

// All sales route
router.get('/all-sales', salescontrollers.allsales);

// today sales
router.get('/today-sales', salescontrollers.todaysales);

// Sales by date route
router.get('/by-date', salescontrollers.getSalesByDate);

module.exports = router;