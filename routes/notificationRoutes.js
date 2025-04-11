// notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to create notification
router.post('/', notificationController.createNotification);

// Route to get all notifications
router.get('/', notificationController.getNotifications);

// Route to get a specific notification by ID
router.get('/:id', notificationController.getNotificationById);

// Route to update a notification by ID
router.put('/:id', notificationController.updateNotification);

// Route to delete a notification by ID
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
