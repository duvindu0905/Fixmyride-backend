const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/garages', searchController.getAllGarages);
router.post('/garages', searchController.createGarage);
router.get('/garages/name/:garageName', searchController.getGarageByName);


module.exports = router;
