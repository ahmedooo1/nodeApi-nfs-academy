const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "Outlook365", // Pour Outlook.com, utilisez "Outlook365"
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET, 
    },
  });
module.exports = transporter;
