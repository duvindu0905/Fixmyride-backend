const express = require("express");
const router = express.Router();
const {
    getNearbyMechanics,
    createBreakdownBooking,
    getUpcomingBookings
} = require("../controllers/breakdownController");

router.get("/mechanics", getNearbyMechanics);

router.post("/bookings", createBreakdownBooking);

router.get("/bookings/upcoming", getUpcomingBookings);

module.exports = router;
