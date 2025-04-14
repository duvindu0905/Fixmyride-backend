const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');

dotenv.config();

const app = express();

// ✅ Use body-parser for AWS Lambda compatibility
app.use(bodyParser.json()); // Replace express.json()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Route mounting
app.use('/api/notifications', notificationRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api', authRoutes);

// ✅ 404 fallback logger (optional)
app.use((req, res, next) => {
  console.log(`⚠️ Unhandled route: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Export handler for Lambda
module.exports.handler = serverless(app);
