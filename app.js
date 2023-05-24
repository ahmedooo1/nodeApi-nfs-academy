const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const stripeRoute = require('./routes/stripe');
const contactRoutes = require('./routes/contactRoutes');


mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1/stuff', stuffRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', contactRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ajoutez cet endpoint pour traiter les paiements Stripe
app.use('/api/v1', stripeRoute);


module.exports = app;