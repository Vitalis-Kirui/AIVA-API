const Stocks = require('../models/add-stock');

// Saving new stock
const savingnewstock = async (req, res) => {
  try {
    const productdata = req.body;

    const existingProduct = await Stocks.findOne({ productname: productdata.productname});
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: `Product with name ${productdata.productname} already exists`,
      });
    }

    const product = new Stocks(productdata);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving product",
      error: error.message,
    });
  }
};

// Fetching all the stocks
const fetchingallstocks = (req, res) => { 
    
    Stocks.find().sort({productname : 1})
        .then((stocks) => { 

            let totalstocks = stocks.length;
            let totalBuyingPrice = 0;
            let totalSellingPrice = 0;

            stocks.forEach(stock => {
              totalBuyingPrice += stock.quantity * stock.buyingprice;
              totalSellingPrice += stock.quantity * stock.sellingprice;
            });
            res.json({
                total: totalstocks,
                stocks: stocks,
                totalbuyingprice:totalBuyingPrice,
                totalsellingprice:totalSellingPrice
            })
                })
                
        .catch(error => {
                    console.log(error);
                    res.json({
                        message: 'An error occurred while fetching data for all stocks',
                        error: error
                    })
        })
};

// Fetching a single stock
const fetchingsinglestock = (req, res) => {
  const id = req.params.id;

  Stocks.find({ _id: id })
    .then((success) => {
      res.json({
        success: true,
        stockdata: success,
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "There an error fetchin stock data",
        error: error.message,
      });
    });
};

// Deleting a stock
const deletestock = (req, res) => {

  let id = req.params.id;

  Stocks.findByIdAndDelete(id)
    .then((success) => {
      res.json({
        success: true,
        message:"The stock was deleted successfully"
        })
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "There was an error deleting the stock",
        error:error.message
    })
  })
  
}

// Update stock
const updatestock = (req, res) =>{

  const stockid = req.params.id;

  const newstockdata = req.body;

  Stocks.findByIdAndUpdate(stockid, newstockdata)
      .then((success) =>{

        res.json({
          success:true,
          message:"Stock updated successfully"
        })

      })
      .catch((error) =>{
        res.json({
          success:false,
          message:"Error updating stock"
        })
      })

}

module.exports = {
    savingnewstock,
    fetchingallstocks,
    fetchingsinglestock,
    deletestock,
    updatestock
}
