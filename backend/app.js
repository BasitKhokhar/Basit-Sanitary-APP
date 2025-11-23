require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const paymentRoutes = require('./routes/paymentRoutes');
const contentRoutes = require('./routes/contentRoutes');
const notificationsRoutes = require('./routes/NotificationsRoutes');
const splashScreensRoutes = require('./routes/splashScreensRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Route groups
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/content', contentRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/splashscreens', splashScreensRoutes);

app.get('/', (req, res) => res.send("Basit's modular backend is live 🚀"));

module.exports = app;