// controllers/activityController.js
const Activity = require('../models/activityModel');


const getCompletedActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const addActivity = async (req, res) => {
  const { bookingId, centerName, description, date, price } = req.body;

  try {
    const newActivity = new Activity({ bookingId, centerName, description, date, price });
    const saved = await newActivity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not save activity' });
  }
};

module.exports = {
  getCompletedActivities,
  addActivity
};

