const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

describe('car routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a game', async () => {
    const expected = {
      type: 'Board',
      name: 'Codenames',
    };
    const res = await request(app).post('/api/v1/games').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all games', async () => {
    const expected = await Game.getAll();
    const res = await request(app).get('/api/v1/games');
    expect(res.body).toEqual(expected);
  });

  it('gets a game by its id', async () => {
    const expected = await Game.getById(1);
    const res = await request(app).get(`/api/v1/games/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('updates a game based off its id', async () => {
    const expected = {
      type: 'Board',
      name: 'Monopoly',
    };
    const res = await request(app)
      .patch('/api/v1/games/1')
      .send({ name: 'Monopoly' });
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
