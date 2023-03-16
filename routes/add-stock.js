const express = require('express');
const router = express.Router();
const stockcontrollers = require('../controllers/add-stock');

// Saving new stock route
router.post('/new-stock', stockcontrollers.savingnewstock);

// Fetching all the stock
router.get('/all-stocks', stockcontrollers.fetchingallstocks);

// Fetching single stock route
router.get('/single-stock/:id', stockcontrollers.fetchingsinglestock)

module.exports = router;