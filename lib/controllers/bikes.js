const { Router } = require('express');
const Bike = require('../models/Bike');

module.exports = Router().post('/', async (req, res) => {
  try {
    const bike = await Bike.insert({
      brand: req.body.brand,
      model: req.body.model,
      components: req.body.components,
    });
    res.send(bike);
  } catch {
    return null;
  }
});
