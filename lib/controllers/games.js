const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router().post('/', async (req, res) => {
  const game = await Game.insert({
    type: req.body.type,
    name: req.body.name,
  });
  res.send(game);
});
