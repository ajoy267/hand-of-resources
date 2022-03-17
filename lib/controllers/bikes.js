const { Router } = require('express');
const Bike = require('../models/Bike');
const BikeService = require('../services/BikeService');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const bike = await BikeService.create(req.body);
      res.send(bike);
    } catch {
      return null;
    }
  })

  .get('/', async (req, res) => {
    const bike = await Bike.getAll();
    res.send(bike);
  });
