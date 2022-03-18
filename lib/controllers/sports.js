const { Router } = require('express');
const Sport = require('../models/Sport');

module.exports = Router()
  .post('/', async (req, res) => {
    const sport = await Sport.insert({
      name: req.body.name,
      team: req.body.team,
    });
    res.send(sport);
  })

  .get('/', async (req, res) => {
    const sport = await Sport.getAll();
    res.send(sport);
  });
