const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notificationRoutes = require('./routes/notificationRoutes'); 

const serverless = require( 'serverless-http');
const activityRoutes = require('./routes/activityRoutes');


dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the notification routes
app.use('/api/notifications', notificationRoutes);
// app.use('/api/authentications', authRoutes);
app.use('/api/activities', activityRoutes); 

 //const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports.handler = serverless(app);