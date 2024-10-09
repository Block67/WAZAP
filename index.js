// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
