const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  memberSince: String
});

module.exports = mongoose.model('Profile', profileSchema);
