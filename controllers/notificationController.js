const Notification = require('../models/notificationModel');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, day } = req.body;
    const notification = new Notification({
      title,
      message,
      day,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get a specific notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a notification by ID
exports.updateNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true } // Return the updated notification
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
