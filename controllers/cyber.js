const Cyber = require("../models/cyber");
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

// Saving new cyber service
const newcyberservice = async (req, res) => {
  try {
    const servicedata = req.body;

    const cyberservice = new Cyber(servicedata);

    await cyberservice.save();

    // define email options
    let mailOptions = {
      from: configvariables.sendingemail,
      to: configvariables.recieveremail,
      subject: "New Cyber Service Registered",
      text: `A new cyber service has been made with the following details:\n\n${cyberservice}`,
    };

    // send email using the transporter object
    let info = await transporter.sendMail(mailOptions);

    console.log("Email notification sent: " + info.response);
    res.status(200).send({
      message: "Cyber service saved and email notification sent.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "There was an error saving the cyber service.",
    });
  }
};

// Fetching all registered cyber services
const allcyberservices = (req, res) => {
  Cyber.find()
    .sort({ createdAt: 1 })
    .then((registeredservices) => {
      let totalservices = registeredservices.length;

      let grandtotal = 0;

      registeredservices.forEach((service) => {
        grandtotal += service.totalcost;
      });

      res.json({
        total: totalservices,
        cyberservices: registeredservices,
        grandtotal: grandtotal,
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
  const startofday = new Date();
  startofday.setHours(0, 0, 0, 0); // Set time to midnight

  const endofday = new Date();
  endofday.setHours(23, 59, 59, 999); // Set time to just before midnight

  Cyber.find({
    createdAt: {
      $gte: startofday,
      $lte: endofday,
    },
  })
    .sort({ createdAt: -1 })
    .then((todaycyberservices) => {
      let totalservices = todaycyberservices.length;

      let dailytotal = 0;

      todaycyberservices.forEach((service) => {
        dailytotal += service.totalcost;
      });

      res.json({
        total: totalservices,
        cyberservices: todaycyberservices,
        todaystotal: dailytotal,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Getting services by date
const getservicesbydate = async (req, res) => {
  const date = req.query.date;

  //Date input is in ISO format (YYYY-MM-DD)
  const startofday = new Date(`${date}T00:00:00.000Z`);
  const endofday = new Date(`${date}T23:59:59.999Z`);

  try {
    const cyberservices = await Cyber.find({
      createdAt: {
        $gte: startofday,
        $lte: endofday,
      },
    });

    res.status(200).json({ cyberservices });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  newcyberservice,
  allcyberservices,
  todaycyberservices,
  getservicesbydate,
};
