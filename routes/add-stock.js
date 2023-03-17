const express = require('express');
const router = express.Router();
const stockcontrollers = require('../controllers/add-stock');

// Saving new stock route
router.post('/new-stock', stockcontrollers.savingnewstock);

// Fetching all the stock
router.get('/all-stocks', stockcontrollers.fetchingallstocks);

// Fetching single stock route
router.get('/single-stock/:id', stockcontrollers.fetchingsinglestock);

// Deleting stock route
router.delete('/delete-stock/:id', stockcontrollers.deletestock);

// Updating stock route
router.put('/update-stock/:id', stockcontrollers.updatestock);

module.exports = router;