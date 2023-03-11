const Sales = require("../models/sales");

// Saving new sale
const newsale = async (req, res) => {

    try {
        const salesdetails = req.body;

        const newsale = new Sales(salesdetails);

        await newsale.save();

        res.json({
            success: true,
            message : "New sale registered successfully"
        })


        
    }
    catch (error) {

        res.json({
            success: false,
            message: "There was an error saving the sale",
            error: error.message
        })
    
    }
    
}

// Fetching all registered sales
const allsales = (req, res) => {
  Sales.find()
    .sort({ createdAt: 1 })
    .then((registeredsales) => {
      let totalsales = registeredsales.length;

      res.json({
        total: totalsales,
        sales: registeredsales,
      });
    })

    .catch((error) => {
      console.log(error);
      res.json({
        message: "An error occurred while fetching sales",
        error: error,
      });
    });
};

// Today's sales
const todaysales = (req, res) => {
  Sales.find({
    createdAt: {
      $lt: new Date(),
      $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
  })
    .sort({ createdAt: -1 })
    .then((todaysales) => {
      let totalsales = todaysales.length;

      res.json({ total: totalsales, sales: todaysales });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  newsale,
  allsales,
  todaysales,
};
