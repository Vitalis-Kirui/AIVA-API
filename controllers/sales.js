const Sales = require('../models/sales');

// Saving new sale
const newsale = (req, res) => { 

    let salesdata = req.body;

    Sales.save(salesdata)
        .then((success) => {
            res.json({
                message: 'Sale registered successfully'
            })
        })
        .catch((error) => { 
            console.log(error)
            res.json({
                message: 'There was an error registering the sale'
            })
        });

};

// Fetching all registered sales
const allsales = (req, res) => { 

    Sales.find()
        .sort({ 'createdAt': 1 })
        .then((registeredsales) => { 

            let totalsales = registeredsales.length;

            res.json({
                
                total: totalsales,
                sales: registeredsales
            })

                .catch((error) => { 
                    console.log(error);
                    res.json({
                        message: 'An error occurred while fetching sales',
                        error: error
                    });
                })

        })
};

module.exports = {
    newsale,
    allsales
}