const mongoose = require('mongoose');

// Define the notification schema
const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
