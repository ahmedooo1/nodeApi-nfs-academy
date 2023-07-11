const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categorieRoutes');
require('dotenv').config();
const guidesRoutes = require('./routes/guides');
const userRoutes = require('./routes/utilisateur');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const stripeRoute = require('./routes/stripe');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors')
const cron = require("node-cron");
const backupDatabase = require("./config/backup");
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, 
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1/guides', guidesRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', contactRoutes);
app.use('/api/v1', stripeRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Schedule a daily backup at 00:00 (minuit)
cron.schedule("00 00 * * *", () => {
  console.log("Running daily backup...");
  backupDatabase();
});

module.exports = app;