const Notification = require('../models/notificationModel');


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


exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();

    //  date is in YYYY-MM-DD
    const formatted = notifications.map(notif => ({
      _id: notif._id,
      title: notif.title,
      message: notif.message,
      date: notif.date.toISOString().split('T')[0] // Keep only the date part
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




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


exports.updateNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true } 
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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
