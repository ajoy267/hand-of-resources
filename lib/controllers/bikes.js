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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const bike = await Bike.getById(req.params.id);
      res.send(bike);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const bike = await Bike.update(req.params.id, req.body);
    res.send(bike);
  })

  .delete('/:id', async (req, res) => {
    const bike = await Bike.delete(req.params.id);
    res.send(bike);
  });
