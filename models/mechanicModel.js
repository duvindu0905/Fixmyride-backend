const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({
    name: String,
    distance: Number,
    price: Number,
    contact: String,
    isAvailable: Boolean,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model("Mechanic", mechanicSchema);
