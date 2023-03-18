const Sales = require("../models/sales");
const Stock = require("../models/add-stock");

// Saving new sale
const newsale = async (req, res) => {

  const saledetails = req.body;

  const salequantity = saledetails.quantity;

  const stocksold = saledetails.productname;

    try {
        // Finding stock being sold
        const stock = await Stock.find({productname: stocksold});

         // Ensure the stock was found
        if (!stock) {
          return res.status(400).json({ message: 'Stock not found' });
        }

        // Checking if stock is enough
        if(stock[0].quantity<salequantity){
          return res.status(400).json({ error: 'Not enough stock available' });
        }
        
        // Deduct stock sold
        stock[0].quantity -= salequantity;

        await stock[0].save();

        // Sales calculations
        const sellingprice = stock[0].sellingprice;
        const buyingprice = stock[0]. buyingprice;

        const clientcost = salequantity * sellingprice;

        const buyingcost = salequantity * buyingprice;

        const projection = clientcost - buyingcost;

        const newsale = new Sales({
          clientsname:saledetails.clientsname,
          productname:saledetails.productname,
          quantity:saledetails.quantity,
          payment:saledetails.payment,
          transactioncode:saledetails.transactioncode,
          clienttotal:clientcost,
          buyingtotal:buyingcost,
          projection:projection
        });

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
