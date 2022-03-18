const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', async (req, res) => {
    const game = await Game.insert({
      type: req.body.type,
      name: req.body.name,
    });
    res.send(game);
  })

  .get('/', async (req, res) => {
    const game = await Game.getAll();
    res.send(game);
  })

  .get('/:id', async (req, res) => {
    const game = await Game.getById(req.params.id);
    res.send(game);
  });
