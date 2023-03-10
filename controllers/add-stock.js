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

module.exports = {
    savingnewstock
}
