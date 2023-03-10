const Expenses = require('../models/expenses');

// Saving new expense
const newexpense = (req, res) => { 

    let expensedata = req.body;

    Expenses.save(expensedata)
        .then((success) => {
            res.json({
                message: 'Expense registered successfully'
            })
        })
        .catch((error) => { 
            console.log(error)
            res.json({
                message: 'There was an error registering the expense'
            })
        });

};

// Fetching all registered expenses
const allexpenses = (req, res) => { 

    Expenses.find()
        .sort({ 'createdAt': 1 })
        .then((registeredexpense) => { 

            let totalexpenses = registeredexpense.length;

            res.json({
                
                total: totalexpenses,
                expenses: registeredexpense
            })

                .catch((error) => { 
                    console.log(error);
                    res.json({
                        message: 'An error occurred while fetching expenses',
                        error: error
                    });
                })

        })
};

module.exports = {
    newexpense,
    allexpenses
}