const mongoose = require('mongoose');

const GarageSchema = new mongoose.Schema({
  garageId: { type: Number, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['repairCenter', 'engineering', 'detailing', 'painting'],
    required: true,
  },
  mobile: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, required: true },
  imageUrls: { type: [String], default: [] },
  availabilityInDouble: { type: Number, required: true },
  availabilityInString: {
    type: String,
    enum: ['low', 'moderate', 'high'],
    required: true,
  },
});

const Garage = mongoose.model('Garage', GarageSchema);
module.exports = Garage;
