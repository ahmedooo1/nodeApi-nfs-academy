const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "Outlook365",
  port: 587, // or 465, or another port depending on your email provider
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET,
  },
});

module.exports = transporter;