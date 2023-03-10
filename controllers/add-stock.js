const { response } = require('express');
const Stocks = require('../models/add-stock');

// Saving new stock
const savingnewstock = (req, res) => { 

    let stockdata = req.body;

    Stocks.find({ productname: stockdata.productname }), (error, existingproduct) => {

        if (error) {
            res.json(error);
            console.log(error);
        }
        if (existingproduct) { 
            res.json({message : 'The product with name ' + stockdata.productname + ' already exists'})
        }
        else {

            // Proceeding to save
            Stocks.save(stockdata)
                .then((success) => {
                    res.json({ message: 'Products added successfully' })
                })
                .catch((error) => { 
                    console.log(error);
                    res.json(error);
                })
            
        }
        
    }

};

// Fetching all the stocks
const fetchingallstocks = (req, res) => { 

    Stocks.find()
        .sort({productname : 1})
        .then((stocks) => { 

            let totalstocks = stocks.length;
            res.json({
                total: totalstocks,
                stocks: stocks
            })
                .catch((error) => { 
                    console.log(error);
                    res.json({
                        message: 'An error occurred while fetching data for all stocks',
                        error: error
                    })
                })
        })
};

module.exports = {
    savingnewstock,
    fetchingallstocks
}
