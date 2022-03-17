const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  .post('/', async (req, res) => {
    const car = await Car.insert({
      brand: req.body.brand,
      make: req.body.make,
      model: req.body.model,
    });
    res.send(car);
  })

  .get('/', async (req, res) => {
    const car = await Car.getAll();
    res.send(car);
  });
