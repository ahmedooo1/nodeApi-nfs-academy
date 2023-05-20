const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');


mongoose.connect('mongodb+srv://hdmStore:hdmStorePass@hdmstore1.vuvmw45.mongodb.net/?retryWrites=true&w=majority',
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

 app.use('/api/stuff', stuffRoutes);

 app.use('/api/auth', userRoutes);

 app.use('/api', commentRoutes);

 app.use('/api', categoryRoutes);

 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports= app;