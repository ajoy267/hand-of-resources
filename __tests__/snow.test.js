const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('snow routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a snow sport', async () => {
    const expected = {
      sport: 'Ski',
      experience: 'Intermediate',
    };
    const res = await request(app).post('/api/v1/snow').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
