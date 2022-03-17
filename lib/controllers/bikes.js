const { Router } = require('express');
const BikeService = require('../services/BikeService');

module.exports = Router().post('/', async (req, res) => {
  try {
    const bike = await BikeService.create(req.body);
    res.send(bike);
  } catch {
    return null;
  }
});
