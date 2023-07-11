const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "Outlook365",
  port: 587, // or 465, or another port depending on your email provider
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;