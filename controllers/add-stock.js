const Stocks = require('../models/add-stock');

// Saving new stock
const savingnewstock = async (req, res) => {

    try {
      
        const productdata = req.body;
        
        const existingproduct = await Stocks.find({ productname: productdata.productname });

        if (existingproduct) {
        
      return res.status(409).json({
        success: false,
        message: `Product with name ${productdata.productname} already exists`,
      });
            
    }

    const product = new Stocks(productdata);

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product saved successfully',
    });
        
    }
    catch (error) {
        
    res.status(500).json({
      success: false,
      message: 'Error saving product',
      error: error.message,
    });
        
    }
    
};

// Fetching all the stocks
const fetchingallstocks = (req, res) => { 
    
    Stocks.find().sort({productname : 1})
        .then((stocks) => { 

            let totalstocks = stocks.length;
            res.json({
                total: totalstocks,
                stocks: stocks
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

module.exports = {
    savingnewstock,
    fetchingallstocks
}
