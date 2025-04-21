const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    customerEmail: { type: String, required: true },
    centerName: { type: String, required: true },
    serviceType: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true } ,
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ["upcoming", "completed"], 
        default: "upcoming"             
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
