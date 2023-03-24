const Sales = require("../models/sales");
const Stock = require("../models/add-stock");
const nodemailer = require("nodemailer");
const configvariables = require("../config/config-variables");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: configvariables.sendingemail,
    pass: configvariables.emailpassword,
  },
});

// Saving new sale
const newsale = async (req, res) => {
  const saledetails = req.body;

  const salequantity = saledetails.quantity;

  const stocksold = saledetails.productname;

  try {
    // Finding stock being sold
    const stock = await Stock.find({ productname: stocksold });

    // Ensure the stock was found
    if (!stock) {
      return res.status(400).json({ message: "Stock not found" });
    }

    // Checking if stock is enough
    if (stock[0].quantity < salequantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // Deduct stock sold
    stock[0].quantity -= salequantity;

    await stock[0].save();

    // Sales calculations
    const sellingprice = stock[0].sellingprice;
    const buyingprice = stock[0].buyingprice;

    const clientcost = salequantity * sellingprice;

    const buyingcost = salequantity * buyingprice;

    const projection = clientcost - buyingcost;

    const newsaledetails = new Sales({
      clientsname: saledetails.clientsname,
      productname: saledetails.productname,
      quantity: saledetails.quantity,
      payment: saledetails.payment,
      transactioncode: saledetails.transactioncode,
      clienttotal: clientcost,
      buyingtotal: buyingcost,
      projection: projection,
    });

    await newsaledetails.save();

    // define email options
    let mailOptions = {
      from: "vitaliskirui1@gmail.com",
      to: configvariables.recieveremail,
      subject: "New sale made",
      text: `A new sale has been made with the following details:\n\n${newsaledetails}`,
    };

    // send email using the transporter object
    let info = await transporter.sendMail(mailOptions);

    console.log("Email notification sent: " + info.response);
    res.status(200).send({
      message: "Sale saved and email notification sent.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "There was an error saving the sale.",
    });
  }
};

// Fetching all registered sales
const allsales = (req, res) => {
  Sales.find()
    .sort({ createdAt: 1 })
    .then((registeredsales) => {
      let totalsales = registeredsales.length;
      let totalstocksold = 0;
      let totalbuyingprice = 0;
      let totalsellingprice = 0;

      registeredsales.forEach((sale) => {
        totalstocksold += sale.quantity;
        totalbuyingprice += sale.buyingtotal;
        totalsellingprice += sale.clienttotal;
      });

      res.json({
        total: totalsales,
        sales: registeredsales,
        stocksold: totalstocksold,
        stocksoldworth: totalbuyingprice,
        totalearnings: totalsellingprice,
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
  const startofday = new Date();
  startofday.setHours(0, 0, 0, 0); // Set time to midnight

  const endofday = new Date();
  endofday.setHours(23, 59, 59, 999); // Set time to just before midnight

  Sales.find({
    createdAt: {
      $gte: startofday,
      $lte: endofday,
    },
  })
    .sort({ createdAt: -1 })
    .then((todaysales) => {
      let totalsales = todaysales.length;
      let totalstocksold = 0;
      let totalbuyingprice = 0;
      let totalsellingprice = 0;

      todaysales.forEach((sale) => {
        totalstocksold += sale.quantity;
        totalbuyingprice += sale.buyingtotal;
        totalsellingprice += sale.clienttotal;
      });

      res.json({
        total: totalsales,
        sales: todaysales,
        stocksold: totalstocksold,
        stocksoldworth: totalbuyingprice,
        totalearnings: totalsellingprice,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Getting sales by date
const getSalesByDate = async (req, res) => {
  const date = req.query.date;

  //Date input is in ISO format (YYYY-MM-DD)
  const startofday = new Date(`${date}T00:00:00.000Z`);
  const endofday = new Date(`${date}T23:59:59.999Z`);

  try {
    const sales = await Sales.find({
      createdAt: {
        $gte: startofday,
        $lte: endofday,
      },
    });

    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  newsale,
  allsales,
  todaysales,
  getSalesByDate,
};
