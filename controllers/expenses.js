const Expenses = require("../models/expenses");

// Saving new expense
const newexpense = async (req, res) => {
  try {
    const expenses = req.body;

    const expense = new Expenses(expenses);

    await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving the expense",
      error: error.message,
    });
  }
};

// Fetching all registered expenses
const allexpenses = (req, res) => {
  Expenses.find()
    .sort({ createdAt: 1 })
    .then((registeredexpenses) => {
      let totalexpenses = registeredexpenses.length;

      let grandtotalexpenses = 0;

      registeredexpenses.forEach((expense) => {
        grandtotalexpenses +=  expense.totalcost;
      });

      res.json({
        total: totalexpenses,
        expenses: registeredexpenses,
        grandtotal: grandtotalexpenses,
      });
    })

    .catch((error) => {
      console.log(error);
      res.json({
        message: "An error occurred while fetching expenses",
        error: error,
      });
    });
};

// Today's expenses
const todayexpenses = (req, res) => {
  Expenses.find({
    createdAt: {
      $lt: new Date(),
      $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
  })
    .sort({ createdAt: -1 })
    .then((todayexpense) => {
      let totalexpenses = todayexpense.length;

      let totalcost = 0;

      todayexpense.forEach((expense) => {
        totalcost += expense.totalcost;

      });

      res.json({ total: totalexpenses, expenses: todayexpense, todaystotal: totalcost });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  newexpense,
  allexpenses,
  todayexpenses,
};
