const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: "Outlook365",
  secure: true,
  auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET,
  },
  tls: {
      rejectUnauthorized: false,
  },
});


