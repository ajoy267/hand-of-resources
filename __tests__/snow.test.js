const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Snow = require('../lib/models/Snow');

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

  it('gets all snow sports', async () => {
    const expected = await Snow.getAll();
    const res = await request(app).get('/api/v1/snow');
    expect(res.body).toEqual(expected);
  });

  it('gets a snow sport by id', async () => {
    const expected = await Snow.getById(1);
    const res = await request(app).get(`/api/v1/snow/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
