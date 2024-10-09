const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');

//ROUTES
const AuthRoutes = require("./routes/AuthRoutes");
const SubscriptionRoutes = require("./routes/SubscriptionRoutes");
const WazapRoutes = require("./routes/WazapRoutes");

//MODELS
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Subscription = require('./models/Subscription');
const Payment = require('./models/Payment');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


// Use the routes
app.use("/api", AuthRoutes);
app.use("/api", SubscriptionRoutes);
app.use("/api", WazapRoutes)

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database.');

    // Start the server after successful synchronization
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Synchronization error:', err);
  });
