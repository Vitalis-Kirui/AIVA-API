const Cyber = require('../models/cyber');

// Saving new cyber service
const newcyberservice = async (req, res) => {
  try {
    const servicedata = req.body;

    const cyberservice = new Cyber(servicedata,);

    await cyberservice.save();

    res.status(201).json({
      success: true,
      message: "Service saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving the service",
      error: error.message,
    });
  }
};

// Fetching all registered cyber services
const allcyberservices = (req, res) => { 

    Cyber.find()
      .sort({ createdAt: 1 })
      .then((registeredservices) => {
        let totalservices = registeredservices.length;

        let grandtotal =0;

      registeredservices.forEach((service) => {
        grandtotal += service.totalcost;
      });

        res.json({
          total: totalservices,
          cyberservices: registeredservices,
          grandtotal : grandtotal
        });
      })

      .catch((error) => {
        console.log(error);
        res.json({
          message: "An error occurred while fetching cyber services",
          error: error,
        });
      });
};

// Today's cyber services
const todaycyberservices = (req, res) => { 

    Cyber.find({ createdAt: { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) } }).sort({ createdAt: -1 })
        .then((todaycyberservices) => {

            let totalservices = todaycyberservices.length;

            let dailytotal = 0;

            todaycyberservices.forEach((service) => {
              dailytotal += service.totalcost;
            });

            res.json({ total: totalservices, cyberservices: todaycyberservices, todaystotal:dailytotal });
        })
        .catch((error) => {
            console.log(error)
         })

};

module.exports = {
    newcyberservice,
    allcyberservices,
    todaycyberservices
}