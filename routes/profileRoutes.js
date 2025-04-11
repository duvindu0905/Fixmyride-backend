const express = require('express');
const router = express.Router();

// Import your controller for profile-related actions
const profileController = require('../controllers/profileController');

// Define your routes
router.get('/:userId', profileController.getProfile);  // Example route to get profile

module.exports = router;
