const express = require('express');
const router = express.Router();
const expensescontrollers = require('../controllers/expenses');

// New expense route
router.post('/new-expense', expensescontrollers.newexpense);

// All expenses route
router.get('/all-expenses', expensescontrollers.allexpenses);

// Today expenses route
router.get('/today-expenses', expensescontrollers.todayexpenses);


module.exports = router;