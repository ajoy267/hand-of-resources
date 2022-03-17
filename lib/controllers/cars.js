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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const car = await Car.getById(req.params.id);
      res.send(car);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const car = await Car.update(req.params.id, req.body);
    res.send(car);
  })

  .delete('/:id', async (req, res) => {
    const car = await Car.delete(req.params.id);
    res.send(car);
  });
