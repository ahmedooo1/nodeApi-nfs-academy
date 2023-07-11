const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: process.env.MAILER_EMAIL, // your email
      pass: process.env.MAILER_SECRET  // your email password
  },
  tls: {
      ciphers:'SSLv3'
  }
});
module.exports = transporter;
