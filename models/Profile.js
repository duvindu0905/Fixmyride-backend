const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  phoneNumber: { type: Number, default: 0 },
  memberSince: { type: String, default: "" }
});

module.exports = mongoose.model('Profile', profileSchema);
