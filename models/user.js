// models/user.js
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiry: { type: Date }
});

module.exports = mongoose.model('Authentication', authSchema, 'Authentications'); 
