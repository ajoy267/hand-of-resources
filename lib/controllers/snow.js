const { Router } = require('express');
const Snow = require('../models/Snow');

module.exports = Router()
  .post('/', async (req, res) => {
    const winter = await Snow.insert({
      sport: req.body.sport,
      experience: req.body.experience,
    });
    res.send(winter);
  })

  .get('/', async (req, res) => {
    const winter = await Snow.getAll();
    res.send(winter);
  })

  .get('/:id', async (req, res) => {
    const winter = await Snow.getById(req.params.id);
    res.send(winter);
  });
