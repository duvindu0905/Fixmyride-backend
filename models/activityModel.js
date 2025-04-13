const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  centerName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
