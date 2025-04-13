const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/completed', activityController.getCompletedActivities);
router.post('/', activityController.addActivity);

module.exports = router;
