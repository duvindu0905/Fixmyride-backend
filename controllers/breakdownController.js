const Mechanic = require("../models/mechanicModel");
const Booking = require("../models/bookingModel");
const moment = require("moment"); 

exports.getNearbyMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.find();
        res.status(200).json({ success: true, data: mechanics });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.createBreakdownBooking = async (req, res) => {
    try {
        console.log("📥 Incoming request body:", req.body);

        const {
            bookingId,
            customerEmail,
            centerName,
            serviceType,
            description,
            date,
            price
        } = req.body;

        // Check required fields manually (optional but useful for clarity)
        if (!bookingId || !customerEmail || !centerName || !serviceType || !date || !price) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Log raw date before formatting
        console.log("🕒 Raw date from frontend:", date);

        // Format the date safely
        const formattedDate = moment(date).utc().format("ddd, DD MMM YYYY hh:mm A");
        console.log("📅 Formatted date:", formattedDate);

        const booking = new Booking({
            bookingId,
            customerEmail,
            centerName,
            serviceType,
            description,
            date: formattedDate,
            price
        });

        const savedBooking = await booking.save();
        console.log("✅ Booking saved:", savedBooking);

        res.status(201).json({
            success: true,
            message: "Booking created",
            data: savedBooking
        });

    } catch (err) {
        console.error("❌ Error saving booking:", err); // full error object
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};


exports.getUpcomingBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ status: "upcoming" }).sort({ date: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
