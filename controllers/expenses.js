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

  const startofday = new Date();
  startofday.setHours(0, 0, 0, 0); // Set time to midnight

  const endofday = new Date();
  endofday.setHours(23, 59, 59, 999); // Set time to just before midnight

  Expenses.find({
    createdAt: {
      $gte: startofday,
      $lte: endofday,
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

// Getting expenses by date
const getexpensesbydate = async(req, res) => {

  const date = req.query.date;

  //Date input is in ISO format (YYYY-MM-DD)
  const startofday = new Date(`${date}T00:00:00.000Z`);
  const endofday = new Date(`${date}T23:59:59.999Z`);

  try {
    const expenses = await Expenses.find({
      createdAt: {
        $gte: startofday,
        $lte: endofday,
      },
    });

    res.status(200).json({expenses});

  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }

};

module.exports = {
  newexpense,
  allexpenses,
  todayexpenses,
  getexpensesbydate
};
