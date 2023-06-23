const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com', 
  port: 587, 
  secure: false, // true pour 465, false pour d'autres ports 
  auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_BREVO,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`, // Ajoutez un nom d'affichage et une adresse e-mail pour l'en-tête "From"
    to: process.env.MAILER_EMAIL,
    subject: `${name}`,
    text: message,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error); // Affiche l'erreur dans la console

    res.status(500).send({ message: "Erreur lors de l'envoi de l'email" ,error: error.message});
  }
};