const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const breakdownRoutes = require("./routes/breakdownRoute");
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const profileRoutes = require('./routes/profileRoutes');
const searchRoutes = require('./routes/searchRoute');



dotenv.config();
const app = express();

app.use(bodyParser.json()); // use for Lambda body parsing


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/notifications', notificationRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/search', searchRoutes);
app.use("/api/breakdown", breakdownRoutes);

app.use((req, res, next) => {
  console.log(`⚠️ Unhandled route: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// Lambda handler 
// module.exports.handler = serverless(app, {
//   request: (req, event, context) => {
//     try {
//       if (event.body && typeof event.body === "string") {
//         req.body = JSON.parse(event.body);
//       }
//     } catch (e) {
//       console.error("❌ Failed to parse body:", e);
//     }
//   }
// });


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
