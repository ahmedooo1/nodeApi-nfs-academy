const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_EMAIL, // Utilisez votre adresse e-mail Outlook en tant qu'expéditeur
    replyTo: email, // Ajoutez l'adresse e-mail de l'utilisateur au champ replyTo
    to: process.env.MAILER_EMAIL,
    subject: `Message de ${name}`,
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