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
  })

  .get('/:id', async (req, res) => {
    const sport = await Sport.getById(req.params.id);
    res.send(sport);
  })

  .patch('/:id', async (req, res) => {
    const sport = await Sport.update(req.params.id, req.body);
    res.send(sport);
  })

  .delete('/:id', async (req, res) => {
    const sport = await Sport.delete(req.params.id);
    res.send(sport);
  });
