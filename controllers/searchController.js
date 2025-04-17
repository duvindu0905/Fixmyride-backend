const Garage = require('../models/searchModel');


exports.getAllGarages = async (req, res) => {
  try {
    const garages = await Garage.find();
    res.status(200).json(garages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching garages', error });
  }
};


exports.createGarage = async (req, res) => {
  try {
    const garage = new Garage(req.body);
    await garage.save();
    res.status(201).json({ message: 'Garage added successfully', garage });
  } catch (error) {
    res.status(400).json({ message: 'Error adding garage', error });
  }
};

exports.getGarageByName = async (req, res) => {
    try {
      const garageName = req.params.garageName;
      const garage = await Garage.findOne({ name: { $regex: new RegExp(garageName, 'i') } });
  
      if (!garage) {
        return res.status(404).json({ message: 'Garage not found' });
      }
  
      res.status(200).json(garage);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving garage', error });
    }
  };
  